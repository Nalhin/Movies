import { MovieListReadModel } from '../../../domain/read-models/movie-list.read-model';

export interface GetPopularMoviesPort {
  getPopularMovies(userId?: number): Promise<MovieListReadModel[]>;
}

export const GET_POPULAR_MOVIES_PORT = Symbol('GET_POPULAR_MOVIES_PORT');
