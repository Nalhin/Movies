import { Injectable } from '@nestjs/common';
import { MovieRepository } from './persistance/movie/movie.repository';
import { TmdbClientService } from './http/tmdb-movie/tmdb-client.service';
import { GetMoviesPort } from '../../application/port/out/get-movies.port';
import { MovieDetailsReadModel } from '../../domain/read-models/movie-details.read-model';
import { MovieListReadModel } from '../../domain/read-models/movie-list.read-model';
import { GetMovieDetailsPort } from '../../application/port/out/get-movie-details.port';
import { GetSimilarMoviesPort } from '../../application/port/out/get-similar-movies.port';
import { MovieItemResponse } from './http/tmdb-movie/dto/movie-list-response.dto';
import { GetPopularMoviesPort } from '../../application/port/out/get-popular-movies.port';
import { pipe } from 'fp-ts/function';
import * as O from 'fp-ts/Option';
import { PaginatedReadModel } from '../../domain/read-models/paginated.read-model';

@Injectable()
export class MovieQueryAdapter
  implements
    GetMoviesPort,
    GetMovieDetailsPort,
    GetSimilarMoviesPort,
    GetPopularMoviesPort {
  constructor(
    private readonly movieRepository: MovieRepository,
    private readonly movieClient: TmdbClientService,
  ) {}

  async getMovieById(
    movieId: number,
    userId?: number,
  ): Promise<O.Option<MovieDetailsReadModel>> {
    const [movieExternal, moviePersisted] = await Promise.all([
      this.movieClient.getMovieById(movieId).toPromise(),
      this.movieRepository.getPersonalMovieDetails(movieId, userId),
    ]);

    return pipe(
      movieExternal,
      O.map(
        (movie) =>
          new MovieDetailsReadModel({
            ...movie,
            ...moviePersisted,
          }),
      ),
    );
  }

  async getMovies(
    search: string,
    page: number,
    userId?: number,
  ): Promise<O.Option<PaginatedReadModel<MovieListReadModel[]>>> {
    const externalMovies = await this.movieClient
      .queryMovies(search, page)
      .toPromise();

    if (O.isNone(externalMovies)) {
      return O.none;
    }

    const joined = await this.joinWithDbData(
      externalMovies.value.results,
      userId,
    );

    return O.some(
      new PaginatedReadModel(joined, {
        page: externalMovies.value.page,
        totalPages: externalMovies.value.totalPages,
      }),
    );
  }

  async getSimilarMovies(
    movieId: number,
    userId?: number,
  ): Promise<O.Option<MovieListReadModel[]>> {
    const externalMovies = await this.movieClient
      .getSimilarMovies(movieId)
      .toPromise();

    if (O.isNone(externalMovies)) {
      return O.none;
    }

    const joined = await this.joinWithDbData(externalMovies.value, userId);
    return O.some(joined);
  }

  async getPopularMovies(
    page: number,
    userId?: number,
  ): Promise<O.Option<PaginatedReadModel<MovieListReadModel[]>>> {
    const externalMovies = await this.movieClient
      .getPopularMovies(page)
      .toPromise();

    if (O.isNone(externalMovies)) {
      return O.none;
    }

    const joined = await this.joinWithDbData(
      externalMovies.value.results,
      userId,
    );

    return O.some(
      new PaginatedReadModel(joined, {
        page: externalMovies.value.page,
        totalPages: externalMovies.value.totalPages,
      }),
    );
  }

  private async joinWithDbData(
    apiMovies: MovieItemResponse[],
    userId?: number,
  ) {
    const moviesPersisted = await this.movieRepository.getPersonalMoviesDetails(
      apiMovies.map((result) => result.id),
      userId,
    );
    return apiMovies.map(
      (result) =>
        new MovieListReadModel({
          ...result,
          ...moviesPersisted.find((movie) => movie.id === result.id),
        }),
    );
  }
}
