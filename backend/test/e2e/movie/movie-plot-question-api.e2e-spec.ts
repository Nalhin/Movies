import { E2EApp, initializeApp } from '../utils/initialize-app';
import { setupServer } from 'msw/node';
import { getMovieById } from '../mocks/tmdb-api.mock';
import { tmdbMovieDetailsFactory } from '../../factories/tmdb-api';
import request from 'supertest';
import { HttpStatus } from '@nestjs/common';
import * as O from 'fp-ts/Option';
import { GET_PLOT_DETAILS_PORT } from '../../../src/movie/application/port/out/get-plot-details.port';
import { QUESTION_ANSWERING_PORT } from '../../../src/movie/application/port/out/question-answering.port';

describe('Movie Plot Question API', () => {
  let e2eTest: E2EApp;
  const externalMovie = tmdbMovieDetailsFactory.buildOne();

  const plotDetailsPort = {
    getPlotDetails: jest.fn(),
  };
  const questionAnsweringPort = {
    answerQuestion: jest.fn(),
  };

  const server = setupServer();

  beforeEach(async () => {
    e2eTest = await initializeApp({
      overrides: [
        { provider: GET_PLOT_DETAILS_PORT, value: plotDetailsPort },
        { provider: QUESTION_ANSWERING_PORT, value: questionAnsweringPort },
      ],
    });
    server.use(getMovieById(externalMovie));
  });

  beforeAll(() => {
    server.listen();
  });

  afterEach(async () => {
    jest.clearAllMocks();
    server.resetHandlers();
    await e2eTest.cleanup();
  });

  afterAll(() => {
    server.close();
  });

  describe('GET /movies/:id/plot-question', () => {
    it('should return OK (200) status code and answered question', async () => {
      plotDetailsPort.getPlotDetails.mockResolvedValueOnce(
        O.some('description'),
      );
      questionAnsweringPort.answerQuestion.mockResolvedValueOnce(
        O.some('answer'),
      );

      const response = await request(e2eTest.app.getHttpServer())
        .get(`/movies/${externalMovie.id}/plot-question`)
        .query({ question: 'question' })
        .expect(HttpStatus.OK);

      expect(response.body.answer).toBe('answer');
    });

    it('should return NOT_FOUND (404) status code when move is not found', () => {
      return request(e2eTest.app.getHttpServer())
        .get(`/movies/${externalMovie.id + 1}/plot-question`)
        .query({ question: 'question' })
        .expect(HttpStatus.NOT_FOUND);
    });

    it('should return UNPROCESSABLE_ENTITY (422) status code when question could not be answered', () => {
      plotDetailsPort.getPlotDetails.mockResolvedValueOnce(
        O.some('description'),
      );
      questionAnsweringPort.answerQuestion.mockResolvedValueOnce(O.none);

      return request(e2eTest.app.getHttpServer())
        .get(`/movies/${externalMovie.id}/plot-question`)
        .query({ question: 'question' })
        .expect(HttpStatus.UNPROCESSABLE_ENTITY);
    });

    it('should return NOT_FOUND (404) status code when movie plot is not found', () => {
      plotDetailsPort.getPlotDetails.mockResolvedValueOnce(O.none);

      return request(e2eTest.app.getHttpServer())
        .get(`/movies/${externalMovie.id}/plot-question`)
        .query({ question: 'question' })
        .expect(HttpStatus.NOT_FOUND);
    });
  });
});
