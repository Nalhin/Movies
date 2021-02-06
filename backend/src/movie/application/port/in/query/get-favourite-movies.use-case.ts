import * as O from 'fp-ts/Option';
import { PaginatedReadModel } from '../../../../domain/read-model/paginated.read-model';
import { MovieListReadModel } from '../../../../domain/read-model/movie-list.read-model';

export interface GetFavouriteMoviesUseCase {
  getFavouriteMovies(
    page: number,
    userId: number,
  ): Promise<O.Option<PaginatedReadModel<MovieListReadModel[]>>>;
}

export const GET_FAVOURITE_MOVIES_USE_CASE = Symbol(
  'GET_FAVOURITE_MOVIES_USE_CASE',
);
