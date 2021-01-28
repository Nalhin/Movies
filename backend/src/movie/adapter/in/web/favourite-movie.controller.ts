import {
  ConflictException,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Inject,
  InternalServerErrorException,
  NotFoundException,
  Post,
} from '@nestjs/common';
import { AuthRequired } from '../../../../common/decorators/auth-required.decorator';
import { CurrentUser } from '../../../../common/decorators/current-user.decorator';
import {
  ADD_FAVOURITE_MOVIE_USE_CASE,
  AddFavouriteMovieUseCase,
  AddFavouriteMovieCommand,
  AddFavouriteMovieErrors,
} from '../../../application/port/in/command/add-favourite-movie.use-case';
import {
  REMOVE_FAVOURITE_MOVIE_USE_CASE,
  RemoveFavouriteMovieCommand,
  RemoveFavouriteMovieErrors,
  RemoveFavouriteMovieUseCase,
} from '../../../application/port/in/command/remove-favourite-movie.use-case';
import { ApiTags } from '@nestjs/swagger';
import { AuthenticatedUser } from '../../../../common/model/app-user.model';
import { Id } from '../../../../common/params/id';
import { pipe } from 'fp-ts/function';
import * as E from 'fp-ts/Either';

@Controller()
@ApiTags('movie')
export class FavouriteMovieController {
  constructor(
    @Inject(ADD_FAVOURITE_MOVIE_USE_CASE)
    private readonly addFavouriteMovieUseCase: AddFavouriteMovieUseCase,
    @Inject(REMOVE_FAVOURITE_MOVIE_USE_CASE)
    private readonly removeFavouriteMovieUseCase: RemoveFavouriteMovieUseCase,
  ) {}

  @AuthRequired()
  @HttpCode(HttpStatus.OK)
  @Post('/movies/:id/favourite')
  async addFavouriteMovie(
    @Id() movieId: number,
    @CurrentUser() user: AuthenticatedUser,
  ): Promise<void> {
    return pipe(
      await this.addFavouriteMovieUseCase.addFavourite(
        new AddFavouriteMovieCommand(movieId, user.id),
      ),
      E.getOrElse((error) => {
        switch (error) {
          case AddFavouriteMovieErrors.MovieNotFound:
            throw new NotFoundException('Movie was not found');
          case AddFavouriteMovieErrors.MovieAlreadyFavourite:
            throw new ConflictException('Movie is already marked as favourite');
          case AddFavouriteMovieErrors.PersistenceError:
            throw new InternalServerErrorException();
        }
      }),
    );
  }

  @AuthRequired()
  @HttpCode(HttpStatus.OK)
  @Delete('/movies/:id/favourite')
  async removeFavouriteMovie(
    @Id() movieId: number,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return pipe(
      await this.removeFavouriteMovieUseCase.removeFavourite(
        new RemoveFavouriteMovieCommand(movieId, user.id),
      ),
      E.getOrElse((error) => {
        switch (error) {
          case RemoveFavouriteMovieErrors.MovieNotFound:
            throw new NotFoundException('Movie was not found');
          case RemoveFavouriteMovieErrors.MovieNotFavourite:
            throw new ConflictException('Movie is not marked as favourite');
          case RemoveFavouriteMovieErrors.PersistenceError:
            throw new InternalServerErrorException();
        }
      }),
    );
  }
}
