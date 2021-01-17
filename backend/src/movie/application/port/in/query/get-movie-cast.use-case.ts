import { MovieCastReadModel } from '../../../../domain/read-models/movie-cast.read-model';

export interface GetMovieCastUseCase {
  getMovieCast(movieId: number): Promise<MovieCastReadModel[]>;
}

export const GET_MOVIE_CAST_USE_CASE = Symbol('GET_MOVIE_CAST_USE_CASE');
