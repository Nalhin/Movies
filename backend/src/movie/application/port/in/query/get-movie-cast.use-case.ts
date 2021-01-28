import { MovieCastReadModel } from '../../../../domain/read-models/movie-cast.read-model';
import * as O from 'fp-ts/Option';

export interface GetMovieCastUseCase {
  getMovieCast(movieId: number): Promise<O.Option<MovieCastReadModel[]>>;
}

export const GET_MOVIE_CAST_USE_CASE = Symbol('GET_MOVIE_CAST_USE_CASE');
