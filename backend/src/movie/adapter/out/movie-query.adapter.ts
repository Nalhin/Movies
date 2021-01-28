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
import { MovieCastReadModel } from '../../domain/read-models/movie-cast.read-model';
import { map } from 'rxjs/operators';
import { GetMovieCastPort } from '../../application/port/out/get-movie-cast.port';
import { pipe } from 'fp-ts/function';
import * as O from 'fp-ts/Option';

@Injectable()
export class MovieQueryAdapter
  implements
    GetMoviesPort,
    GetMovieDetailsPort,
    GetSimilarMoviesPort,
    GetPopularMoviesPort,
    GetMovieCastPort {
  constructor(
    private readonly movieRepository: MovieRepository,
    private readonly movieClient: TmdbClientService,
  ) {}

  async getMovieById(
    movieId: number,
    userId?: number,
  ): Promise<MovieDetailsReadModel> {
    const [movieExternal, moviePersisted] = await Promise.all([
      this.movieClient.getMovieById(movieId).toPromise(),
      this.movieRepository.getPersonalMovieDetails(movieId, userId),
    ]);
    return new MovieDetailsReadModel({
      ...movieExternal,
      userRating: moviePersisted?.userRating ?? null,
      isFavourite: moviePersisted?.isFavourite ?? false,
    });
  }

  async getMovies(
    search: string,
    page: number,
    userId?: number,
  ): Promise<MovieListReadModel[]> {
    const externalMovies = await this.movieClient
      .queryMovies(search, page)
      .toPromise();

    return this.joinWithDbData(externalMovies.results, userId);
  }

  async getSimilarMovies(
    movieId: number,
    userId?: number,
  ): Promise<MovieListReadModel[]> {
    const externalMovies = await this.movieClient
      .getSimilarMovies(movieId)
      .toPromise();

    return this.joinWithDbData(externalMovies.results, userId);
  }

  async getPopularMovies(userId?: number): Promise<MovieListReadModel[]> {
    const externalMovies = await this.movieClient
      .getPopularMovies()
      .toPromise();

    return this.joinWithDbData(externalMovies.results, userId);
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

  getMovieCast(movieId: number): Promise<O.Option<MovieCastReadModel[]>> {
    return this.movieClient
      .getMovieCast(movieId)
      .pipe(
        map((cast) =>
          pipe(
            cast,
            O.map((cast) =>
              cast.map(
                (val) =>
                  new MovieCastReadModel(
                    val.id,
                    val.name,
                    val.character,
                    String(val.profilePath),
                  ),
              ),
            ),
          ),
        ),
      )
      .toPromise();
  }
}
