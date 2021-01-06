import { Body, Controller, Delete, Inject, Param, Post } from '@nestjs/common';
import { AuthRequired } from '../../../../common/decorators/auth-required.decorator';
import { RateMovieRequestDto } from './dto/rate-movie-request.dto';
import { CurrentUser } from '../../../../common/decorators/current-user.decorator';
import { User } from '../../../../user/user.entity';
import {
  RateMovieUseCase,
  RATE_MOVIE_USE_CASE,
} from '../../../application/port/in/rate-movie.use-case';
import {
  REMOVE_MOVIE_RATING_USE_CASE,
  RemoveMovieRatingUseCase,
} from '../../../application/port/in/remove-movie-rating.use-case';

@Controller()
export class MovieRatingController {
  constructor(
    @Inject(RATE_MOVIE_USE_CASE)
    private readonly rateMovieUseCase: RateMovieUseCase,
    @Inject(REMOVE_MOVIE_RATING_USE_CASE)
    private readonly removeRatingUseCase: RemoveMovieRatingUseCase,
  ) {}

  @AuthRequired()
  @Post('/movies/:id/rating')
  async rateMovie(
    @Param('id') movieId: number,
    @Body() requestBody: RateMovieRequestDto,
    @CurrentUser() user: User,
  ) {
    return this.rateMovieUseCase.rateMovie(movieId, requestBody.score, user.id);
  }

  @AuthRequired()
  @Delete('/movies/:id/rating')
  async deleteRating(@Param('id') movieId: number, @CurrentUser() user: User) {
    return this.removeRatingUseCase.removeRating(movieId, user.id);
  }
}
