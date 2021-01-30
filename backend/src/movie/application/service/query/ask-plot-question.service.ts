import { Inject, Injectable } from '@nestjs/common';
import {
  AskPlotQuestionErrors,
  AskPlotQuestionUseCase,
} from '../../port/in/query/ask-plot-question.use-case';
import {
  GET_MOVIE_DETAILS,
  GetMovieDetailsPort,
} from '../../port/out/get-movie-details.port';
import {
  GET_PLOT_DETAILS_PORT,
  GetPlotDetailsPort,
} from '../../port/out/get-plot-details.port';
import {
  QUESTION_ANSWERING_PORT,
  QuestionAnsweringPort,
} from '../../port/out/question-answering.port';
import { pipe } from 'fp-ts/function';
import * as E from 'fp-ts/Either';
import * as O from 'fp-ts/Option';

@Injectable()
export class AskPlotQuestionService implements AskPlotQuestionUseCase {
  constructor(
    @Inject(GET_MOVIE_DETAILS)
    private readonly movieDetailsProvider: GetMovieDetailsPort,
    @Inject(GET_PLOT_DETAILS_PORT)
    private readonly plotDetailsProvider: GetPlotDetailsPort,
    @Inject(QUESTION_ANSWERING_PORT)
    private readonly questionAnswerProvider: QuestionAnsweringPort,
  ) {}

  async askPlotQuestion(
    movieId: number,
    question: string,
  ): Promise<E.Either<AskPlotQuestionErrors, string>> {
    const movie = await this.movieDetailsProvider.getMovieById(movieId);

    if (O.isNone(movie)) {
      return E.left(AskPlotQuestionErrors.MovieNotFound);
    }

    const plotDetails = await this.plotDetailsProvider.getPlotDetails(
      movie.value.imdbId,
      movie.value.title,
    );

    if (O.isNone(plotDetails)) {
      return E.left(AskPlotQuestionErrors.MoviePlotNotFound);
    }

    const plotQuestion = await this.questionAnswerProvider.answerQuestion(
      question,
      plotDetails.value,
    );

    return pipe(
      plotQuestion,
      E.fromOption(() => AskPlotQuestionErrors.PlotQuestionNotAnswered),
    );
  }
}
