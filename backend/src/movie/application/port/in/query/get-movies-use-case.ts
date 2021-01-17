import { MovieListReadModel } from '../../../../domain/read-models/movie-list.read-model';

export interface GetMoviesUseCase {
  getMovies(
    search: string,
    page: number,
    userId: number,
  ): Promise<MovieListReadModel[]>;
}

export const GET_MOVIES_USE_CASE = Symbol('GET_MOVIES_USE_CASE');
