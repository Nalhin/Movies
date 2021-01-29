import { E2EApp, initializeApp } from '../utils/initialize-app';
import { setupServer } from 'msw/node';
import request from 'supertest';
import { HttpStatus } from '@nestjs/common';
import {
  tmdbMovieDetailsFactory,
  tmdvMovieItemResponse,
} from '../../factories/tmdb-api';
import {
  getMovieById,
  getPopularMovies,
  getSimilarMovies,
  queryMovies,
} from '../mocks/tmdb-api.mock';
import { authenticate } from '../utils/authenticate';

describe('Movie API', () => {
  let e2eTest: E2EApp;
  const server = setupServer();

  beforeEach(async () => {
    e2eTest = await initializeApp();
  });

  beforeAll(() => {
    server.listen();
  });

  afterEach(async () => {
    server.resetHandlers();
    await e2eTest.cleanup();
  });

  afterAll(() => {
    server.close();
  });

  const addUserSpecificDetails = async (
    authenticatedRequest: request.SuperAgentTest,
    movieId: number,
    rating: number,
  ): Promise<void> => {
    await authenticatedRequest.post(`/movies/${movieId}/favourite`);
    await authenticatedRequest
      .post(`/movies/${movieId}/rating`)
      .send({ rating });
  };

  describe('GET /movies/:id', () => {
    const movie = tmdbMovieDetailsFactory.buildOne();

    beforeEach(() => {
      server.use(getMovieById(movie));
    });

    it('should return OK (200) status code and movie', async () => {
      const response = await request(e2eTest.app.getHttpServer())
        .get(`/movies/${movie.id}`)
        .expect(HttpStatus.OK);

      expect(response.body).toStrictEqual(
        expect.objectContaining({
          averageRating: null,
          userRating: null,
          isFavourite: false,
          title: movie.title,
          id: movie.id,
          budget: movie.budget,
        }),
      );
    });

    it('should return OK (200) status code and display user specific movie details', async () => {
      const { authenticatedRequest } = await authenticate(e2eTest.app);
      await addUserSpecificDetails(authenticatedRequest, movie.id, 4);

      const response = await authenticatedRequest
        .get(`/movies/${movie.id}`)
        .expect(HttpStatus.OK);

      expect(response.body).toStrictEqual(
        expect.objectContaining({
          averageRating: 4,
          userRating: 4,
          isFavourite: true,
          title: movie.title,
          id: movie.id,
          budget: movie.budget,
        }),
      );
    });

    it('should return NOT_FOUND (404) status code when movie is not found', () => {
      return request(e2eTest.app.getHttpServer())
        .get(`/movies/${movie.id + 1}`)
        .expect(HttpStatus.NOT_FOUND);
    });
  });

  describe('GET /movies', () => {
    const movies = tmdvMovieItemResponse.buildMany(4);
    const totalPages = 4;

    beforeEach(() => {
      server.use(
        queryMovies(movies, totalPages),
        getMovieById(tmdbMovieDetailsFactory.buildOne({ ...movies[0] })),
      );
    });

    it('should return OK (200) status code and paginated movies', async () => {
      const response = await request(e2eTest.app.getHttpServer())
        .get(`/movies`)
        .query({ page: 2, search: 'search' })
        .expect(HttpStatus.OK);

      expect(response.body.page).toBe(2);
      expect(response.body.totalPages).toBe(totalPages);
      expect(response.body.data.length).toBe(4);
    });

    it('should return NOT_FOUND (404) when page is not found', () => {
      return request(e2eTest.app.getHttpServer())
        .get('/movies')
        .query({ page: totalPages + 1 })
        .expect(HttpStatus.NOT_FOUND);
    });

    it('should return OK (200) status code and display user specific movie details', async () => {
      const { authenticatedRequest } = await authenticate(e2eTest.app);
      await addUserSpecificDetails(authenticatedRequest, movies[0].id, 4);

      const response = await authenticatedRequest
        .get('/movies')
        .query({ page: 2, search: 'search' })
        .expect(HttpStatus.OK);

      expect(response.body.data[0]).toStrictEqual(
        expect.objectContaining({
          userRating: 4,
          averageRating: 4,
          isFavourite: true,
        }),
      );
    });
  });

  describe('GET /movies/popular', () => {
    const movies = tmdvMovieItemResponse.buildMany(4);
    const totalPages = 4;

    beforeEach(() => {
      server.use(
        getPopularMovies(movies, totalPages),
        getMovieById(tmdbMovieDetailsFactory.buildOne({ ...movies[0] })),
      );
    });

    it('should return OK (200) status code and popular movies', async () => {
      const response = await request(e2eTest.app.getHttpServer())
        .get('/movies/popular')
        .query({ page: 2 })
        .expect(HttpStatus.OK);

      expect(response.body.page).toBe(2);
      expect(response.body.totalPages).toBe(totalPages);
      expect(response.body.data.length).toBe(4);
    });

    it('should return NOT_FOUND (404) when page is not found', () => {
      return request(e2eTest.app.getHttpServer())
        .get(`/movies/popular`)
        .query({ page: totalPages + 1 })
        .expect(HttpStatus.NOT_FOUND);
    });

    it('should return OK (200) status code and display user specific movie details', async () => {
      const { authenticatedRequest } = await authenticate(e2eTest.app);
      await addUserSpecificDetails(authenticatedRequest, movies[0].id, 4);

      const response = await authenticatedRequest
        .get(`/movies/popular`)
        .query({ page: 2 })
        .expect(HttpStatus.OK);

      expect(response.body.data[0]).toStrictEqual(
        expect.objectContaining({
          userRating: 4,
          averageRating: 4,
          isFavourite: true,
        }),
      );
    });
  });

  describe('GET /movies/:id/similar', () => {
    const movies = tmdvMovieItemResponse.buildMany(4);
    const movieId = 1;

    beforeEach(() => {
      server.use(
        getSimilarMovies(movies, movieId),
        getMovieById(tmdbMovieDetailsFactory.buildOne({ ...movies[0] })),
      );
    });

    it('should return OK (200) status code and similar movies', async () => {
      const response = await request(e2eTest.app.getHttpServer())
        .get(`/movies/${movieId}/similar`)
        .expect(HttpStatus.OK);

      expect(response.body.length).toBe(4);
    });

    it('should return OK (200) status code and display user specific movie details', async () => {
      const { authenticatedRequest } = await authenticate(e2eTest.app);
      await addUserSpecificDetails(authenticatedRequest, movies[0].id, 4);

      const response = await authenticatedRequest
        .get(`/movies/${movieId}/similar`)
        .expect(HttpStatus.OK);

      expect(response.body[0]).toStrictEqual(
        expect.objectContaining({
          userRating: 4,
          averageRating: 4,
          isFavourite: true,
        }),
      );
    });

    it('should return NOT_FOUND (404) status code when movie is not found', () => {
      return request(e2eTest.app.getHttpServer())
        .get(`/movies/${movieId + 1}/popular`)
        .expect(HttpStatus.NOT_FOUND);
    });
  });
});
