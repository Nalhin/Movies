import { Movie } from '../../../domain/movie.domain';

export interface UpdateMoviePort {
  updateMovie(movie: Movie, userId: number): Promise<void>;
}

export const UPDATE_MOVIE_PORT = Symbol('UPDATE_MOVIE_PORT');
