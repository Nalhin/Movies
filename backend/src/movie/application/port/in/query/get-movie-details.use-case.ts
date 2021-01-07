import { Movie } from '../../../../domain/movie.domain-model';

export interface GetMovieDetailsUseCase {
  getMovieDetails(movieId: number, userId: number): Promise<Movie>;
}

export const GET_MOVIE_DETAILS_USE_CASE = Symbol('GET_MOVIE_DETAILS_USE_CASE');
