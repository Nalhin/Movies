import { MovieDetailsReadModel } from '../../../../domain/movie-details.read-model';

export interface GetMovieDetailsUseCase {
  getMovieDetails(
    movieId: number,
    userId: number,
  ): Promise<MovieDetailsReadModel>;
}

export const GET_MOVIE_DETAILS_USE_CASE = Symbol('GET_MOVIE_DETAILS_USE_CASE');
