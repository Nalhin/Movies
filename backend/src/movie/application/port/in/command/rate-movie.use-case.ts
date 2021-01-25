import { SelfValidating } from '../../../../../common/self-validating/self-validating';
import { IsInt, Max, Min } from 'class-validator';
import * as E from 'fp-ts/Either';

export interface RateMovieUseCase {
  rateMovie(
    command: RateMovieCommand,
  ): Promise<E.Either<RateMovieErrors, void>>;
}

export const RATE_MOVIE_USE_CASE = Symbol('RATE_MOVIE_USE_CASE');

export enum RateMovieErrors {
  MovieAlreadyRated = 'MOVIE_ALREADY_RATED',
  MovieNotFound = 'MOVIE_NOT_FOUND',
  PersistenceError = 'PERSISTENCE_ERROR',
}

export class RateMovieCommand extends SelfValidating {
  @IsInt()
  readonly movieId: number;

  @IsInt()
  @Min(1)
  @Max(10)
  readonly rating: number;

  @IsInt()
  readonly userId: number;

  constructor(movieId: number, rating: number, userId: number) {
    super();
    this.movieId = movieId;
    this.rating = rating;
    this.userId = userId;
    this.validate();
  }
}
