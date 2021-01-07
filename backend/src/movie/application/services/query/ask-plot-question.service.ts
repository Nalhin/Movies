import { Inject, Injectable } from '@nestjs/common';
import { AskPlotQuestionUseCase } from '../../port/in/query/ask-plot-question.use-case';
import { from, Observable } from 'rxjs';
import {
  GET_MOVIE_DETAILS,
  GetMovieDetailsPort,
} from '../../port/out/get-movie-details.port';
import {
  GET_PLOT_DETAILS,
  GetPlotDetailsPort,
} from '../../port/out/get-plot-details.port';
import {
  QUESTION_ANSWERING,
  QuestionAnsweringPort,
} from '../../port/out/question-answering.port';
import { mergeMap } from 'rxjs/operators';

@Injectable()
export class AskPlotQuestionService implements AskPlotQuestionUseCase {
  constructor(
    @Inject(GET_MOVIE_DETAILS)
    private readonly movieDetailsProvider: GetMovieDetailsPort,
    @Inject(GET_PLOT_DETAILS)
    private readonly plotDetailsProvider: GetPlotDetailsPort,
    @Inject(QUESTION_ANSWERING)
    private readonly questionAnswerProvider: QuestionAnsweringPort,
  ) {}

  askPlotQuestion(movieId: number, question: string): Observable<string> {
    return from(this.movieDetailsProvider.getMovieById(movieId)).pipe(
      mergeMap((movie) =>
        this.plotDetailsProvider.getPlotDetails(movie.imdbId, movie.title),
      ),
      mergeMap((plotDetails) =>
        from(this.questionAnswerProvider.answerQuestion(question, plotDetails)),
      ),
    );
  }
}
