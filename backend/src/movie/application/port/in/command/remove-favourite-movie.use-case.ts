export interface RemoveFavouriteMovieUseCase {
  removeFavourite(movieId: number, userId: number): Promise<void>;
}

export const REMOVE_FAVOURITE_MOVIE_USE_CASE = Symbol(
  'REMOVE_FAVOURITE_MOVIE_USE_CASE',
);
