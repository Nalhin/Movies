import { E2EApp, initializeApp } from '../utils/initialize-app';
import { setupServer } from 'msw/node';
import { tmdbMovieDetailsFactory } from '../../factories/tmdb-api';
import { getMovieById } from '../mocks/tmdb-api.mock';
import { authenticate } from '../utils/authenticate';
import { HttpStatus } from '@nestjs/common';
import request from 'supertest';

describe('Movie Rating API', () => {
  let e2eTest: E2EApp;
  const server = setupServer();
  const externalMovie = tmdbMovieDetailsFactory.buildOne();

  beforeEach(async () => {
    e2eTest = await initializeApp();
  });

  beforeAll(() => {
    server.listen();
  });

  beforeEach(() => {
    server.use(getMovieById(externalMovie));
  });

  afterEach(async () => {
    server.resetHandlers();
    await e2eTest.cleanup();
  });

  afterAll(() => {
    server.close();
  });

  describe('POST /movies/:id/rating', () => {
    it('should return OK (200) status code and rate the movie', async () => {
      const { authenticatedRequest } = await authenticate(e2eTest.app);

      await authenticatedRequest
        .post(`/movies/${externalMovie.id}/rating`)
        .send({ rating: 5 })
        .expect(HttpStatus.OK);

      const response = await authenticatedRequest.get(
        `/movies/${externalMovie.id}`,
      );
      expect(response.body.userRating).toEqual(5);
    });

    it('should return FORBIDDEN (403) status code when user is not authorized', () => {
      return request(e2eTest.app.getHttpServer())
        .post(`/movies/${externalMovie.id}/rating`)
        .send({ rating: 4 })
        .expect(HttpStatus.FORBIDDEN);
    });

    it('should return NOT_FOUND (404) status code when move is not found', async () => {
      const { authenticatedRequest } = await authenticate(e2eTest.app);

      await authenticatedRequest
        .post(`/movies/${externalMovie.id + 1}/rating`)
        .send({ rating: 4 })
        .expect(HttpStatus.NOT_FOUND);
    });

    it('should return CONFLICT (409) status code when movie is already rated', async () => {
      const { authenticatedRequest } = await authenticate(e2eTest.app);
      await authenticatedRequest
        .post(`/movies/${externalMovie.id}/rating`)
        .send({ rating: 5 })
        .expect(HttpStatus.OK);

      await authenticatedRequest
        .post(`/movies/${externalMovie.id}/rating`)
        .send({ rating: 5 })
        .expect(HttpStatus.CONFLICT);
    });

    it('should return BAD_REQUEST (400) status code when rating is invalid', async () => {
      const { authenticatedRequest } = await authenticate(e2eTest.app);

      await authenticatedRequest
        .post(`/movies/${externalMovie.id}/rating`)
        .send({ rating: 4.4 })
        .expect(HttpStatus.BAD_REQUEST);
    });
  });

  describe('DELETE /movies/:id/rating', () => {
    it('should return OK (200) status code and remove movie rating', async () => {
      const { authenticatedRequest } = await authenticate(e2eTest.app);
      await authenticatedRequest
        .post(`/movies/${externalMovie.id}/rating`)
        .send({ rating: 5 })
        .expect(HttpStatus.OK);

      await authenticatedRequest
        .delete(`/movies/${externalMovie.id}/rating`)
        .expect(HttpStatus.OK);

      const response = await authenticatedRequest.get(
        `/movies/${externalMovie.id}`,
      );
      expect(response.body.userRating).toEqual(null);
    });

    it('should return FORBIDDEN (403) status code when user is not authorized', () => {
      return request(e2eTest.app.getHttpServer())
        .delete(`/movies/${externalMovie.id}/rating`)
        .expect(HttpStatus.FORBIDDEN);
    });

    it('should return NOT_FOUND (404) status code when move is not found', async () => {
      const { authenticatedRequest } = await authenticate(e2eTest.app);

      await authenticatedRequest
        .delete(`/movies/${externalMovie.id + 1}/rating`)
        .expect(HttpStatus.NOT_FOUND);
    });

    it('should return CONFLICT (409) status code when movie is not rated', async () => {
      const { authenticatedRequest } = await authenticate(e2eTest.app);

      await authenticatedRequest
        .delete(`/movies/${externalMovie.id}/rating`)
        .expect(HttpStatus.CONFLICT);
    });
  });
});
