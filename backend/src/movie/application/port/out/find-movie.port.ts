import { Movie } from '../../../domain/models/movie.domain-model';
import * as O from 'fp-ts/Option';

export interface FindMoviePort {
  findById(movieId: number, userId: number): Promise<O.Option<Movie>>;
}

export const FIND_MOVIE_PORT = Symbol('FIND_MOVIE_PORT');
