import { Injectable } from '@nestjs/common';
import { TmdbClientService } from '../tmdb/tmdb-client.service';
import { mergeMap } from 'rxjs/operators';
import { QuestionAnsweringService } from '../question-answering/question-answering.service';
import { WikipediaService } from '../wikipedia/wikipedia.service';

@Injectable()
export class MovieService {
  constructor(
    private readonly tmdbClient: TmdbClientService,
    private readonly questionAnswering: QuestionAnsweringService,
    private readonly wikiService: WikipediaService,
  ) {}

  getMovieById(id: number) {
    return this.tmdbClient.getMovieById(id);
  }

  getMovies(search: string, page: number) {
    return this.tmdbClient.searchMovies(search, page);
  }

  answerQuestion(movieId: number, question: string) {
    return this.tmdbClient.getMovieById(movieId).pipe(
      mergeMap((movie) =>
        this.wikiService.getWikiPlot(movie.imdbId, movie.title),
      ),
      mergeMap((movieData) =>
        this.questionAnswering.answerQuestion(question, movieData),
      ),
    );
  }
}
