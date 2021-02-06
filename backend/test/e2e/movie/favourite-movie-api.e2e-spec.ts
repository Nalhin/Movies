import { E2EApp, initializeApp } from '../utils/initialize-app';
import { setupServer } from 'msw/node';
import { getMovieById } from '../mocks/tmdb-api.mock';
import { tmdbMovieDetailsFactory } from '../../factories/tmdb-api';
import { authenticate } from '../utils/authenticate';
import { HttpStatus } from '@nestjs/common';
import request from 'supertest';

describe('Favourite Movie API', () => {
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

  describe('POST /movies/:id/favourite', () => {
    it('should return OK (200) status code and mark the movie as favourite', async () => {
      const { authenticatedRequest } = await authenticate(e2eTest.app);

      await authenticatedRequest
        .post(`/movies/${externalMovie.id}/favourite`)
        .expect(HttpStatus.OK);

      const response = await authenticatedRequest.get(
        `/movies/${externalMovie.id}`,
      );
      expect(response.body.isFavourite).toBeTrue();
    });

    it('should return FORBIDDEN (403) status code when user is not authorized', () => {
      return request(e2eTest.app.getHttpServer())
        .post(`/movies/${externalMovie.id}/favourite`)
        .expect(HttpStatus.FORBIDDEN);
    });

    it('should return NOT_FOUND (404) status code when move is not found', async () => {
      const { authenticatedRequest } = await authenticate(e2eTest.app);

      await authenticatedRequest
        .post(`/movies/${externalMovie.id + 1}/favourite`)
        .expect(HttpStatus.NOT_FOUND);
    });

    it('should return CONFLICT (409) status code when movie is already favourite', async () => {
      const { authenticatedRequest } = await authenticate(e2eTest.app);
      await authenticatedRequest
        .post(`/movies/${externalMovie.id}/favourite`)
        .expect(HttpStatus.OK);

      await authenticatedRequest
        .post(`/movies/${externalMovie.id}/favourite`)
        .expect(HttpStatus.CONFLICT);
    });
  });

  describe('DELETE /movies/:id/favourite', () => {
    it('should return OK (200) status code and remove movie from favourites', async () => {
      const { authenticatedRequest } = await authenticate(e2eTest.app);
      await authenticatedRequest
        .post(`/movies/${externalMovie.id}/favourite`)
        .expect(HttpStatus.OK);

      await authenticatedRequest
        .delete(`/movies/${externalMovie.id}/favourite`)
        .expect(HttpStatus.OK);

      const response = await authenticatedRequest.get(
        `/movies/${externalMovie.id}`,
      );
      expect(response.body.isFavourite).toBeFalse();
    });

    it('should return FORBIDDEN (403) status code when user is not authorized', () => {
      return request(e2eTest.app.getHttpServer())
        .delete(`/movies/${externalMovie.id}/favourite`)
        .expect(HttpStatus.FORBIDDEN);
    });

    it('should return NOT_FOUND (404) status code when move is not found', async () => {
      const { authenticatedRequest } = await authenticate(e2eTest.app);

      await authenticatedRequest
        .delete(`/movies/${externalMovie.id + 1}/favourite`)
        .expect(HttpStatus.NOT_FOUND);
    });

    it('should return CONFLICT (409) status code when movie is not favourite', async () => {
      const { authenticatedRequest } = await authenticate(e2eTest.app);

      await authenticatedRequest
        .delete(`/movies/${externalMovie.id}/favourite`)
        .expect(HttpStatus.CONFLICT);
    });
  });

  describe('GET /me/movies/favourite', () => {
    it('should return OK (200) status code and favourite movies page', async () => {
      const { authenticatedRequest } = await authenticate(e2eTest.app);
      await authenticatedRequest.post(`/movies/${externalMovie.id}/favourite`);

      const response = await authenticatedRequest
        .get(`/me/movies/favourite`)
        .query({ page: 1 })
        .expect(HttpStatus.OK);

      expect(response.body.data.length).toBe(1);
      expect(response.body.hasNextPage).toBe(false);
    });

    it('should return UNAUTHORIZED (403) when user is not authenticated ', () => {
      return request(e2eTest.app.getHttpServer())
        .get('/me/movies/favourite')
        .query({ page: 1 })
        .expect(HttpStatus.FORBIDDEN);
    });

    it('should return NOT_FOUND (404) when page is not found', async () => {
      const { authenticatedRequest } = await authenticate(e2eTest.app);

      await authenticatedRequest
        .get(`/me/movies/favourite`)
        .query({ page: 2 })
        .expect(HttpStatus.NOT_FOUND);
    });

    it('should return OK (200) when first page is empty', async () => {
      const { authenticatedRequest } = await authenticate(e2eTest.app);

      await authenticatedRequest
        .get(`/me/movies/favourite`)
        .query({ page: 1 })
        .expect(HttpStatus.OK);
    });
  });
});
