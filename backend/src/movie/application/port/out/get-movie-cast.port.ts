import { MovieCastReadModel } from '../../../domain/read-model/movie-cast.read-model';
import * as O from 'fp-ts/Option';

export interface GetMovieCastPort {
  getMovieCast(movieId: number): Promise<O.Option<MovieCastReadModel[]>>;
}

export const GET_MOVIE_CAST_PORT = Symbol('GET_MOVIE_CAST_PORT');
