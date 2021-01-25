import { Inject, Injectable } from '@nestjs/common';
import {
  RateMovieCommand,
  RateMovieErrors,
  RateMovieUseCase,
} from '../../port/in/command/rate-movie.use-case';
import { FIND_MOVIE_PORT, FindMoviePort } from '../../port/out/find-movie.port';
import {
  UPDATE_MOVIE_PORT,
  UpdateMoviePort,
} from '../../port/out/update-movie.port';
import * as E from 'fp-ts/Either';
import { pipe } from 'fp-ts/function';
import * as TE from 'fp-ts/TaskEither';

@Injectable()
export class RateMovieService implements RateMovieUseCase {
  constructor(
    @Inject(FIND_MOVIE_PORT)
    private readonly findMoviePort: FindMoviePort,
    @Inject(UPDATE_MOVIE_PORT)
    private readonly updateMoviePort: UpdateMoviePort,
  ) {}

  async rateMovie(
    command: RateMovieCommand,
  ): Promise<E.Either<RateMovieErrors, void>> {
    return await pipe(
      await this.findMoviePort.findById(command.movieId, command.userId),
      TE.fromOption(() => RateMovieErrors.MovieNotFound),
      TE.chain((movie) =>
        pipe(
          movie.rate(command.rating),
          TE.fromOption(() => RateMovieErrors.MovieAlreadyRated),
        ),
      ),
      TE.map((updatedMovie) =>
        TE.tryCatch(
          () => this.updateMoviePort.updateMovie(updatedMovie, command.userId),
          () => RateMovieErrors.PersistenceError,
        ),
      ),
      TE.flatten,
    )();
  }
}
