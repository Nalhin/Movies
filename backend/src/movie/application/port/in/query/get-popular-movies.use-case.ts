import { MovieListReadModel } from '../../../../domain/read-model/movie-list.read-model';
import * as O from 'fp-ts/Option';
import { PaginatedReadModel } from '../../../../domain/read-model/paginated.read-model';

export interface GetPopularMoviesUseCase {
  getPopularMovies(
    page: number,
    userId?: number,
  ): Promise<O.Option<PaginatedReadModel<MovieListReadModel[]>>>;
}

export const GET_POPULAR_MOVIES_USE_CASE = Symbol(
  'GET_POPULAR_MOVIES_USE_CASE',
);
