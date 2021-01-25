import { IsInt } from 'class-validator';
import { SelfValidating } from '../../../../../common/self-validating/self-validating';
import * as E from 'fp-ts/Either';

export interface RemoveFavouriteMovieUseCase {
  removeFavourite(
    command: RemoveFavouriteMovieCommand,
  ): Promise<E.Either<RemoveFavouriteMovieErrors, void>>;
}

export const REMOVE_FAVOURITE_MOVIE_USE_CASE = Symbol(
  'REMOVE_FAVOURITE_MOVIE_USE_CASE',
);

export enum RemoveFavouriteMovieErrors {
  MovieNotFavourite = 'MOVIE_NOT_FAVOURITE',
  MovieNotFound = 'MOVIE_NOT_FOUND',
  PersistenceError = 'PERSISTENCE_ERROR',
}

export class RemoveFavouriteMovieCommand extends SelfValidating {
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
