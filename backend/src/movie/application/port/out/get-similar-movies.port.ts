import { MovieListReadModel } from '../../../domain/read-models/movie-list.read-model';

export interface GetSimilarMoviesPort {
  getSimilarMovies(
    movieId: number,
    userId?: number,
  ): Promise<MovieListReadModel[]>;
}

export const GET_SIMILAR_MOVIES_PORT = Symbol('GET_SIMILAR_MOVIES_PORT');
