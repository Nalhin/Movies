import { Injectable } from '@nestjs/common';
import { MovieRepository } from './movie/movie.repository';
import { TmdbClientService } from '../http/tmdb-movie/tmdb-client.service';
import { GetMoviesPort } from '../../../application/port/out/get-movies.port';
import { MovieListReadModel } from 'src/movie/domain/movie-list.read-model';

@Injectable()
export class MovieQueryPersistenceAdapter implements GetMoviesPort {
  constructor(
    private readonly movieRepository: MovieRepository,
    private readonly movieClient: TmdbClientService,
  ) {}

  async getDetails(
    movieId: number,
    userId: number,
  ): Promise<MovieDetailsReadModel> {
    const [movieExternal, moviePersisted] = await Promise.all([
      this.movieClient.getMovieById(movieId).toPromise(),
      this.movieRepository.getPersonalMovieDetails(movieId, userId),
    ]);

    return new MovieDetailsReadModel({
      ...movieExternal,
      userRating: moviePersisted.userRating,
      isFavourite: moviePersisted.isFavourite,
    });
  }

  async getMovies(
    search: string,
    page: number,
    userId: number,
  ): Promise<MovieListReadModel[]> {
    const externalMovies = await this.movieClient
      .queryMovies(search, page)
      .toPromise();

    const moviesPersisted = await this.movieRepository.getPersonalMoviesDetails(
      externalMovies.results.map((result) => result.id),
      userId,
    );

    return externalMovies.results.map(
      (result) =>
        new MovieListReadModel({
          ...result,
          ...moviesPersisted.find((movie) => movie.id === result.id),
        }),
    );
  }
}
