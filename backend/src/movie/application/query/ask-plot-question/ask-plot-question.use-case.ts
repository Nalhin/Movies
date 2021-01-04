import { mergeMap } from 'rxjs/operators';
import { GetMovieCastPort } from '../../port/in/query/get-movie-cast.port';
import { PlotDetailsAdapter } from '../../port/out/plot-details.adapter';
import { QuestionAnsweringAdapter } from '../../port/out/question-answering.adapter';
import { AskPlotQuestionQuery } from './ask-plot-question.query';
import { MovieDetailsAdapter } from '../../port/out/movie-details.adapter';
import { QueryHandler } from '@nestjs/cqrs';

@QueryHandler(AskPlotQuestionQuery)
export class AskPlotQuestionUseCase implements GetMovieCastPort {
  constructor(
    private readonly movieDetailsAdapter: MovieDetailsAdapter,
    private readonly plotDetailsAdapter: PlotDetailsAdapter,
    private readonly questionAnsweringAdapter: QuestionAnsweringAdapter,
  ) {}

  execute(query: AskPlotQuestionQuery): Promise<any> {
    return this.movieDetailsAdapter
      .getMovieById(query.movieId)
      .pipe(
        mergeMap((movie) =>
          this.plotDetailsAdapter.getPlotDetails(movie.imdbId, movie.title),
        ),
        mergeMap((plot) =>
          this.questionAnsweringAdapter.answerQuestion(query.question, plot),
        ),
      )
      .toPromise();
  }
}
