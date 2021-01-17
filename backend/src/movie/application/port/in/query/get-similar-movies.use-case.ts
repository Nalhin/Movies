import { MovieListReadModel } from '../../../../domain/read-models/movie-list.read-model';

export interface GetSimilarMoviesUseCase {
  getSimilarMovies(
    movieId: number,
    userId?: number,
  ): Promise<MovieListReadModel[]>;
}

export const GET_SIMILAR_MOVIES_USE_CASE = Symbol(
  'GET_SIMILAR_MOVIES_USE_CASE',
);
