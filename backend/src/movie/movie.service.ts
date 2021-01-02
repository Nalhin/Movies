import { Injectable } from '@nestjs/common';
import { TmdbClientService } from '../tmdb/tmdb-client.service';
import { mergeMap } from 'rxjs/operators';
import { QuestionAnsweringService } from '../question-answering/question-answering.service';

@Injectable()
export class MovieService {
  constructor(
    private readonly tmdbClient: TmdbClientService,
    private readonly questionAnswering: QuestionAnsweringService,
  ) {}

  getMovieById(id: number) {
    return this.tmdbClient.getMovieById(id);
  }

  getMovies(search: string, page: number) {
    return this.tmdbClient.searchMovies(search, page);
  }

  answerQuestion(movieId: number, question: string) {
    return this.tmdbClient
      .getMovieById(movieId)
      .pipe(
        mergeMap((movie) =>
          this.questionAnswering.answerQuestion(question, movie.overview),
        ),
      );
  }
}
