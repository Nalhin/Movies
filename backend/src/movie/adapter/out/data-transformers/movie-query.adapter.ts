import { Injectable } from '@nestjs/common';
import { MovieRepository } from '../persistance/movie/movie.repository';
import { TmdbClientService } from '../movie-data/tmdb-movie-data/tmdb-client.service';
import { GetMoviesPort } from '../../../application/port/out/get-movies.port';
import { MovieDetailsReadModel } from '../../../domain/read-model/movie-details.read-model';
import { MovieListReadModel } from '../../../domain/read-model/movie-list.read-model';
import { GetMovieDetailsPort } from '../../../application/port/out/get-movie-details.port';
import { GetSimilarMoviesPort } from '../../../application/port/out/get-similar-movies.port';
import { MovieItemResponse } from '../movie-data/tmdb-movie-data/dto/movie-list-response.dto';
import { GetPopularMoviesPort } from '../../../application/port/out/get-popular-movies.port';
import { pipe } from 'fp-ts/function';
import * as O from 'fp-ts/Option';
import { PaginatedReadModel } from '../../../domain/read-model/paginated.read-model';

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
      this.movieRepository.getMovieDetails(movieId, userId),
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

    return O.some(
      new PaginatedReadModel(
        await this.joinWithDbData(externalMovies.value.results, userId),
        {
          page: externalMovies.value.page,
          totalPages: externalMovies.value.totalPages,
        },
      ),
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

    return O.some(await this.joinWithDbData(externalMovies.value, userId));
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

    return O.some(
      new PaginatedReadModel(
        await this.joinWithDbData(externalMovies.value.results, userId),
        {
          page: externalMovies.value.page,
          totalPages: externalMovies.value.totalPages,
        },
      ),
    );
  }

  private async joinWithDbData(
    apiMovies: MovieItemResponse[],
    userId?: number,
  ) {
    const moviesPersisted = await this.movieRepository.getMoviesDetails(
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
