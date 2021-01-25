import { SelfValidating } from '../../../../../common/self-validating/self-validating';
import { IsInt } from 'class-validator';
import * as E from 'fp-ts/Either';

export interface RemoveMovieRatingUseCase {
  removeRating(
    command: RemoveMovieRatingCommand,
  ): Promise<E.Either<RemoveMovieRatingErrors, void>>;
}

export const REMOVE_MOVIE_RATING_USE_CASE = Symbol(
  'REMOVE_MOVIE_RATING_USE_CASE',
);

export enum RemoveMovieRatingErrors {
  MovieNotRated = 'MOVIE_NOT_RATED',
  MovieNotFound = 'MOVIE_NOT_FOUND',
  PersistenceError = 'PERSISTENCE_ERROR',
}

export class RemoveMovieRatingCommand extends SelfValidating {
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
