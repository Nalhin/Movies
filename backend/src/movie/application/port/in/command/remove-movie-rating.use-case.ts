export interface RemoveMovieRatingUseCase {
  removeRating(movieId: number, userId: number): Promise<void>;
}

export const REMOVE_MOVIE_RATING_USE_CASE = Symbol(
  'REMOVE_MOVIE_RATING_USE_CASE',
);
