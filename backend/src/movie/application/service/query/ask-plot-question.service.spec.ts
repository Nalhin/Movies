import { Test } from '@nestjs/testing';
import { GET_MOVIE_DETAILS } from '../../port/out/get-movie-details.port';
import { GET_PLOT_DETAILS_PORT } from '../../port/out/get-plot-details.port';
import { QUESTION_ANSWERING_PORT } from '../../port/out/question-answering.port';
import * as O from 'fp-ts/Option';
import * as E from 'fp-ts/Either';
import { AskPlotQuestionService } from './ask-plot-question.service';
import { AskPlotQuestionErrors } from '../../port/in/query/ask-plot-question.use-case';

describe('AskPlotQuestionService', () => {
  const getMovieDetailsPort = {
    getMovieById: jest.fn(),
  };
  const getPlotDetailsPort = {
    getPlotDetails: jest.fn(),
  };
  const questionAnsweringPort = {
    answerQuestion: jest.fn(),
  };
  let service: AskPlotQuestionService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        AskPlotQuestionService,
        { provide: GET_MOVIE_DETAILS, useValue: getMovieDetailsPort },
        {
          provide: GET_PLOT_DETAILS_PORT,
          useValue: getPlotDetailsPort,
        },
        {
          provide: QUESTION_ANSWERING_PORT,
          useValue: questionAnsweringPort,
        },
      ],
    }).compile();

    service = moduleRef.get(AskPlotQuestionService);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('askPlotQuestion()', () => {
    it('should return an error when movie is not found', async () => {
      getMovieDetailsPort.getMovieById.mockResolvedValueOnce(O.none);

      const actualResult = await service.askPlotQuestion(1, 'question');

      expect(actualResult).toStrictEqual(
        E.left(AskPlotQuestionErrors.MovieNotFound),
      );
      expect(getMovieDetailsPort.getMovieById).toBeCalledWith(1);
    });

    it('should return an error when plot details are not found', async () => {
      getMovieDetailsPort.getMovieById.mockResolvedValueOnce(O.some({}));
      getPlotDetailsPort.getPlotDetails.mockResolvedValueOnce(O.none);

      const actualResult = await service.askPlotQuestion(1, 'question');

      expect(actualResult).toStrictEqual(
        E.left(AskPlotQuestionErrors.MoviePlotNotFound),
      );
    });

    it('should return an error when question could not be answered', async () => {
      getMovieDetailsPort.getMovieById.mockResolvedValueOnce(O.some({}));
      getPlotDetailsPort.getPlotDetails.mockResolvedValueOnce(
        O.some('details'),
      );
      questionAnsweringPort.answerQuestion.mockResolvedValueOnce(O.none);

      const actualResult = await service.askPlotQuestion(1, 'question');

      expect(actualResult).toStrictEqual(
        E.left(AskPlotQuestionErrors.PlotQuestionNotAnswered),
      );
    });

    it('should answer the question', async () => {
      getMovieDetailsPort.getMovieById.mockResolvedValueOnce(O.some({}));
      getPlotDetailsPort.getPlotDetails.mockResolvedValueOnce(
        O.some('details'),
      );
      questionAnsweringPort.answerQuestion.mockResolvedValueOnce(
        O.some('answer'),
      );

      const actualResult = await service.askPlotQuestion(1, 'question');

      expect(actualResult).toStrictEqual(E.right('answer'));
    });
  });
});
