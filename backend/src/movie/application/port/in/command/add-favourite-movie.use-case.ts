import { IsInt } from 'class-validator';
import { SelfValidating } from '../../../../../common/self-validating/self-validating';
import * as E from 'fp-ts/Either';

export interface AddFavouriteMovieUseCase {
  addFavourite(
    command: AddFavouriteMovieCommand,
  ): Promise<E.Either<AddFavouriteMovieErrors, void>>;
}

export const ADD_FAVOURITE_MOVIE_USE_CASE = Symbol(
  'ADD_FAVOURITE_MOVIE_USE_CASE',
);

export enum AddFavouriteMovieErrors {
  MovieAlreadyFavourite = 'MOVIE_ALREADY_FAVOURITE',
  MovieNotFound = 'MOVIE_NOT_FOUND',
  PersistenceError = 'PERSISTENCE_ERROR',
}

export class AddFavouriteMovieCommand extends SelfValidating {
  @IsInt()
  readonly movieId: number;
  @IsInt()
  readonly userId: number;

  constructor(movieId: number, userId: number) {
    super();
    this.movieId = movieId;
    this.userId = userId;
    this.validate();
  }
}
