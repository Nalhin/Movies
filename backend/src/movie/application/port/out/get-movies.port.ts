import { MovieListReadModel } from '../../../domain/read-models/movie-list.read-model';
import * as O from 'fp-ts/Option';
import { PaginatedReadModel } from '../../../domain/read-models/paginated.read-model';

export interface GetMoviesPort {
  getMovies(
    search: string,
    page: number,
    userId?: number,
  ): Promise<O.Option<PaginatedReadModel<MovieListReadModel[]>>>;
}

export const GET_MOVIES = Symbol('GET_MOVES');
