export interface RateMovieUseCase {
  rateMovie(movieId: number, rating: number, userId: number): Promise<void>;
}

export const RATE_MOVIE_USE_CASE = Symbol('RATE_MOVIE_USE_CASE');
