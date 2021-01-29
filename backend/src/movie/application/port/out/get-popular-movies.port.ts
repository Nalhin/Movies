import { MovieListReadModel } from '../../../domain/read-models/movie-list.read-model';
import * as O from 'fp-ts/Option';
import { PaginatedReadModel } from '../../../domain/read-models/paginated.read-model';

export interface GetPopularMoviesPort {
  getPopularMovies(
    page: number,
    userId?: number,
  ): Promise<O.Option<PaginatedReadModel<MovieListReadModel[]>>>;
}

export const GET_POPULAR_MOVIES_PORT = Symbol('GET_POPULAR_MOVIES_PORT');
