import { Inject, Injectable } from '@nestjs/common';
import { FIND_MOVIE_PORT, FindMoviePort } from '../../port/out/find-movie.port';
import {
  UPDATE_MOVIE_PORT,
  UpdateMoviePort,
} from '../../port/out/update-movie.port';
import {
  RemoveFavouriteMovieCommand,
  RemoveFavouriteMovieErrors,
  RemoveFavouriteMovieUseCase,
} from '../../port/in/command/remove-favourite-movie.use-case';
import { pipe } from 'fp-ts/function';
import * as TE from 'fp-ts/TaskEither';
import * as E from 'fp-ts/Either';

@Injectable()
export class RemoveFavouriteMovieService
  implements RemoveFavouriteMovieUseCase {
  constructor(
    @Inject(FIND_MOVIE_PORT)
    private readonly findMoviePort: FindMoviePort,
    @Inject(UPDATE_MOVIE_PORT)
    private readonly updateMoviePort: UpdateMoviePort,
  ) {}

  async removeFavourite(
    command: RemoveFavouriteMovieCommand,
  ): Promise<E.Either<RemoveFavouriteMovieErrors, void>> {
    return await pipe(
      await this.findMoviePort.findById(command.movieId, command.userId),
      TE.fromOption(() => RemoveFavouriteMovieErrors.MovieNotFound),
      TE.chain((movie) =>
        pipe(
          movie.removeFromFavourites(),
          TE.fromOption(() => RemoveFavouriteMovieErrors.MovieNotFavourite),
        ),
      ),
      TE.map((updatedMovie) =>
        TE.tryCatch(
          () => this.updateMoviePort.updateMovie(updatedMovie, command.userId),
          () => RemoveFavouriteMovieErrors.PersistenceError,
        ),
      ),
      TE.flatten,
    )();
  }
}
