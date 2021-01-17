import { Movie } from '../../../domain/models/movie.domain-model';

export interface LoadMoviePort {
  loadById(movieId: number, userId: number): Promise<Movie>;
}

export const LOAD_MOVIE_PORT = Symbol('LOAD_MOVIE_PORT');
