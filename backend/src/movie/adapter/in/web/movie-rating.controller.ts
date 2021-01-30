import {
  Body,
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
import { RateMovieRequestDto } from './dto/request/rate-movie-request.dto';
import { CurrentUser } from '../../../../common/decorators/current-user.decorator';
import {
  RateMovieUseCase,
  RATE_MOVIE_USE_CASE,
  RateMovieCommand,
  RateMovieErrors,
} from '../../../application/port/in/command/rate-movie.use-case';
import {
  REMOVE_MOVIE_RATING_USE_CASE,
  RemoveMovieRatingUseCase,
  RemoveMovieRatingCommand,
  RemoveMovieRatingErrors,
} from '../../../application/port/in/command/remove-movie-rating.use-case';
import { ApiTags } from '@nestjs/swagger';
import { AuthenticatedUser } from '../../../../common/model/app-user.model';
import { Id } from '../../../../common/params/id';
import { pipe } from 'fp-ts/function';
import * as E from 'fp-ts/Either';

@Controller()
@ApiTags('movie')
export class MovieRatingController {
  constructor(
    @Inject(RATE_MOVIE_USE_CASE)
    private readonly rateMovieUseCase: RateMovieUseCase,
    @Inject(REMOVE_MOVIE_RATING_USE_CASE)
    private readonly removeRatingUseCase: RemoveMovieRatingUseCase,
  ) {}

  @AuthRequired()
  @Post('/movies/:id/rating')
  @HttpCode(HttpStatus.OK)
  async rateMovie(
    @Id() movieId: number,
    @Body() requestBody: RateMovieRequestDto,
    @CurrentUser() user: AuthenticatedUser,
  ): Promise<void> {
    return pipe(
      await this.rateMovieUseCase.rateMovie(
        new RateMovieCommand(movieId, requestBody.rating, user.id),
      ),
      E.getOrElse((error) => {
        switch (error) {
          case RateMovieErrors.MovieNotFound:
            throw new NotFoundException('Movie was not found');
          case RateMovieErrors.MovieAlreadyRated:
            throw new ConflictException('Movie was already rated by the user');
          case RateMovieErrors.PersistenceError:
            throw new InternalServerErrorException();
          default:
            throw new InternalServerErrorException('Unexpected error');
        }
      }),
    );
  }

  @AuthRequired()
  @Delete('/movies/:id/rating')
  @HttpCode(HttpStatus.OK)
  async deleteRating(
    @Id() movieId: number,
    @CurrentUser() user: AuthenticatedUser,
  ): Promise<void> {
    return pipe(
      await this.removeRatingUseCase.removeRating(
        new RemoveMovieRatingCommand(movieId, user.id),
      ),
      E.getOrElse((error) => {
        switch (error) {
          case RemoveMovieRatingErrors.MovieNotFound:
            throw new NotFoundException('Movie was not found');
          case RemoveMovieRatingErrors.MovieNotRated:
            throw new ConflictException('Movie was not rated by the user');
          case RemoveMovieRatingErrors.PersistenceError:
            throw new InternalServerErrorException();
          default:
            throw new InternalServerErrorException('Unexpected error');
        }
      }),
    );
  }
}
