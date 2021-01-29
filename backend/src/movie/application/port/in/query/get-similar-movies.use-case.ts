import { MovieListReadModel } from '../../../../domain/read-models/movie-list.read-model';
import * as O from 'fp-ts/Option';

export interface GetSimilarMoviesUseCase {
  getSimilarMovies(
    movieId: number,
    userId?: number,
  ): Promise<O.Option<MovieListReadModel[]>>;
}

export const GET_SIMILAR_MOVIES_USE_CASE = Symbol(
  'GET_SIMILAR_MOVIES_USE_CASE',
);
