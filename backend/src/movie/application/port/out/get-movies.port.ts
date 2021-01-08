import { MovieListReadModel } from '../../../domain/movie-list.read-model';

export interface GetMoviesPort {
  getMovies(
    search: string,
    page: number,
    userId: number,
  ): Promise<MovieListReadModel[]>;
}

export const GET_MOVIES = Symbol('GET_MOVES');
