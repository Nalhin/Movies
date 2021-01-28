import { E2EApp, initializeApp } from '../utils/initialize-app';
import { setupServer } from 'msw/node';
import { tmbdMovieCastListFactory } from '../../factories/tmdb-api';
import { getMovieCast } from '../mocks/tmdb-api.mock';
import request from 'supertest';
import { HttpStatus } from '@nestjs/common';

describe('Movie Cast API', () => {
  let e2eTest: E2EApp;
  const server = setupServer();
  const movieCast = tmbdMovieCastListFactory.buildMany(4);
  const movieId = 1;

  beforeEach(async () => {
    e2eTest = await initializeApp();
    server.use(getMovieCast({ cast: movieCast }, movieId));
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

  describe('GET /movies/:id/cast', () => {
    it('should return OK (200) and response with movie cast', async () => {
      const expectedResponse = movieCast.map((cast) => ({
        id: cast.id,
        name: cast.name,
        character: cast.character,
        profilePath: cast.profilePath,
      }));

      const response = await request(e2eTest.app.getHttpServer())
        .get(`/movies/${movieId}/cast`)
        .expect(HttpStatus.OK);

      expect(response.body).toStrictEqual(expectedResponse);
    });

    it('should return NOT FOUND (404) status code when movie does not exist', () => {
      return request(e2eTest.app.getHttpServer())
        .get('/movies/2/cast')
        .expect(HttpStatus.NOT_FOUND);
    });
  });
});
