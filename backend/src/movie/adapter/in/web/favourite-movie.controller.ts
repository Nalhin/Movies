import { Controller, Delete, Inject, Param, Post } from '@nestjs/common';
import { AuthRequired } from '../../../../common/decorators/auth-required.decorator';
import { CurrentUser } from '../../../../common/decorators/current-user.decorator';
import {
  ADD_FAVOURITE_MOVIE_USE_CASE,
  AddFavouriteMovieUseCase,
} from '../../../application/port/in/command/add-favourite-movie.use-case';
import { RemoveFavouriteMovieUseCase } from '../../../application/port/in/command/remove-favourite-movie.use-case';
import { RATE_MOVIE_USE_CASE } from '../../../application/port/in/command/rate-movie.use-case';
import { ApiTags } from '@nestjs/swagger';
import { AuthenticatedUser } from '../../../../common/model/app-user.model';

@Controller()
@ApiTags('movie')
export class FavouriteMovieController {
  constructor(
    @Inject(ADD_FAVOURITE_MOVIE_USE_CASE)
    private readonly addFavouriteMovieUseCase: AddFavouriteMovieUseCase,
    @Inject(RATE_MOVIE_USE_CASE)
    private readonly removeFavouriteMovieUseCase: RemoveFavouriteMovieUseCase,
  ) {}

  @AuthRequired()
  @Post('/movies/:id/favourite')
  async addFavouriteMovie(
    @Param('id') movieId: number,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.addFavouriteMovieUseCase.addFavourite(movieId, user.id);
  }

  @AuthRequired()
  @Delete('/movies/:id/favourite')
  async removeFavouriteMovie(
    @Param('id') movieId: number,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.removeFavouriteMovieUseCase.removeFavourite(movieId, user.id);
  }
}
