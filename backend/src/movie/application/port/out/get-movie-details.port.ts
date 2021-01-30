import { MovieDetailsReadModel } from '../../../domain/read-model/movie-details.read-model';
import * as O from 'fp-ts/Option';

export interface GetMovieDetailsPort {
  getMovieById(
    id: number,
    userId?: number,
  ): Promise<O.Option<MovieDetailsReadModel>>;
}

export const GET_MOVIE_DETAILS = Symbol('GET_MOVIE_DETAILS');
