export interface AddFavouriteMovieUseCase {
  addFavourite(movieId: number, userId: number): Promise<void>;
}

export const ADD_FAVOURITE_MOVIE_USE_CASE = Symbol(
  'ADD_FAVOURITE_MOVIE_USE_CASE',
);
