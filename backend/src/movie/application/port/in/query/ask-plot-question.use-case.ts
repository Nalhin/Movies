import * as E from 'fp-ts/Either';

export interface AskPlotQuestionUseCase {
  askPlotQuestion(
    movieId: number,
    question: string,
  ): Promise<E.Either<AskPlotQuestionErrors, string>>;
}

export enum AskPlotQuestionErrors {
  MovieNotFound = 'MOVIE_NOT_FOUND',
  MoviePlotNotFound = 'MOVIE_PLOT_NOT_FOUND',
  PlotQuestionNotAnswered = 'PLOT_QUESTION_NOT_ANSWERED',
}

export const ASK_PLOT_QUESTION_USE_CASE = Symbol('ASK_PLOT_QUESTION_USE_CASE');
