import { MovieCastReadModel } from '../../../domain/read-models/movie-cast.read-model';

export interface GetMovieCastPort {
  getMovieCast(movieId: number): Promise<MovieCastReadModel[]>;
}

export const GET_MOVIE_CAST_PORT = Symbol('GET_MOVIE_CAST_PORT');
