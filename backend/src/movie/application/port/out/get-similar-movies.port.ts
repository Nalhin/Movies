import { MovieListReadModel } from '../../../domain/read-model/movie-list.read-model';
import * as O from 'fp-ts/Option';

export interface GetSimilarMoviesPort {
  getSimilarMovies(
    movieId: number,
    userId?: number,
  ): Promise<O.Option<MovieListReadModel[]>>;
}

export const GET_SIMILAR_MOVIES_PORT = Symbol('GET_SIMILAR_MOVIES_PORT');
