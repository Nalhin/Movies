import { MovieListReadModel } from '../../../../domain/read-models/movie-list.read-model';

export interface GetPopularMoviesUseCase {
  getPopularMovies(userId?: number): Promise<MovieListReadModel[]>;
}

export const GET_POPULAR_MOVIES_USE_CASE = Symbol(
  'GET_POPULAR_MOVIES_USE_CASE',
);
