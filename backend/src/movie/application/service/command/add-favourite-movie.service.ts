import { Inject, Injectable } from '@nestjs/common';
import { FIND_MOVIE_PORT, FindMoviePort } from '../../port/out/find-movie.port';
import {
  UPDATE_MOVIE_PORT,
  UpdateMoviePort,
} from '../../port/out/update-movie.port';
import {
  AddFavouriteMovieCommand,
  AddFavouriteMovieErrors,
  AddFavouriteMovieUseCase,
} from '../../port/in/command/add-favourite-movie.use-case';
import { pipe } from 'fp-ts/function';
import * as E from 'fp-ts/Either';
import * as TE from 'fp-ts/TaskEither';

@Injectable()
export class AddFavouriteMovieService implements AddFavouriteMovieUseCase {
  constructor(
    @Inject(FIND_MOVIE_PORT)
    private readonly findMoviePort: FindMoviePort,
    @Inject(UPDATE_MOVIE_PORT)
    private readonly updateMoviePort: UpdateMoviePort,
  ) {}

  async addFavourite(
    command: AddFavouriteMovieCommand,
  ): Promise<E.Either<AddFavouriteMovieErrors, void>> {
    return pipe(
      await this.findMoviePort.findById(command.movieId, command.userId),
      TE.fromOption(() => AddFavouriteMovieErrors.MovieNotFound),
      TE.chain((movie) =>
        pipe(
          movie.markAsFavourite(),
          TE.fromOption(() => AddFavouriteMovieErrors.MovieAlreadyFavourite),
        ),
      ),
      TE.map((updatedMovie) =>
        TE.tryCatch(
          () => this.updateMoviePort.updateMovie(updatedMovie, command.userId),
          () => AddFavouriteMovieErrors.PersistenceError,
        ),
      ),
      TE.flatten,
    )();
  }
}
