import { LoadMoviePort } from '../../../application/port/out/load-movie.port';
import { UpdateMoviePort } from '../../../application/port/out/update-movie.port';
import { Movie } from '../../../domain/movie.domain';
import { MovieRepository } from './movie/movie.repository';
import { MovieRatingRepository } from './movie-rating/movie-rating.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MoviePersistenceAdapter implements LoadMoviePort, UpdateMoviePort {
  constructor(
    private readonly movieRepository: MovieRepository,
    private readonly movieRating: MovieRatingRepository,
  ) {}

  loadById(movieId: number, userId: number): Promise<Movie> {
    return Promise.resolve(undefined);
  }

  updateMovie(movie: Movie, userId: number): Promise<void> {
    return Promise.resolve(undefined);
  }
}
