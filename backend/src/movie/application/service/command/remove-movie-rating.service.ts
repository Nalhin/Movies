import { Inject, Injectable } from '@nestjs/common';
import { FIND_MOVIE_PORT, FindMoviePort } from '../../port/out/find-movie.port';
import {
  UPDATE_MOVIE_PORT,
  UpdateMoviePort,
} from '../../port/out/update-movie.port';
import {
  RemoveMovieRatingCommand,
  RemoveMovieRatingErrors,
  RemoveMovieRatingUseCase,
} from '../../port/in/command/remove-movie-rating.use-case';
import { pipe } from 'fp-ts/function';
import * as TE from 'fp-ts/TaskEither';
import * as E from 'fp-ts/Either';

@Injectable()
export class RemoveMovieRatingService implements RemoveMovieRatingUseCase {
  constructor(
    @Inject(FIND_MOVIE_PORT)
    private readonly findMoviePort: FindMoviePort,
    @Inject(UPDATE_MOVIE_PORT)
    private readonly updateMoviePort: UpdateMoviePort,
  ) {}

  async removeRating(
    command: RemoveMovieRatingCommand,
  ): Promise<E.Either<RemoveMovieRatingErrors, void>> {
    return await pipe(
      await this.findMoviePort.findById(command.movieId, command.userId),
      TE.fromOption(() => RemoveMovieRatingErrors.MovieNotFound),
      TE.chain((movie) =>
        pipe(
          movie.removeRating(),
          TE.fromOption(() => RemoveMovieRatingErrors.MovieNotRated),
        ),
      ),
      TE.map((updatedMovie) =>
        TE.tryCatch(
          () => this.updateMoviePort.updateMovie(updatedMovie, command.userId),
          () => RemoveMovieRatingErrors.PersistenceError,
        ),
      ),
      TE.flatten,
    )();
  }
}
