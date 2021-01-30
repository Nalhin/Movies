import { MovieListReadModel } from '../../../../domain/read-model/movie-list.read-model';
import * as O from 'fp-ts/Option';
import { PaginatedReadModel } from '../../../../domain/read-model/paginated.read-model';

export interface GetMoviesUseCase {
  getMovies(
    search: string,
    page: number,
    userId: number,
  ): Promise<O.Option<PaginatedReadModel<MovieListReadModel[]>>>;
}

export const GET_MOVIES_USE_CASE = Symbol('GET_MOVIES_USE_CASE');
