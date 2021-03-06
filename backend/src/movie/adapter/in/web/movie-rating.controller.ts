import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  InternalServerErrorException,
  NotFoundException,
  Post,
  Query,
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
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthenticatedUser } from '../../../../common/model/app-user.model';
import { Id } from '../../../../common/params/id';
import { pipe } from 'fp-ts/function';
import * as E from 'fp-ts/Either';
import * as O from 'fp-ts/Option';
import { plainToClass } from 'class-transformer';
import { PaginatedMovieListResponseDto } from './dto/response/movie-list-response.dto';
import {
  GET_RATED_MOVIES_USE_CASE,
  GetRatedMoviesUseCase,
} from '../../../application/port/in/query/get-rated-movies-use.case';

@Controller()
@ApiTags('movie')
export class MovieRatingController {
  constructor(
    @Inject(RATE_MOVIE_USE_CASE)
    private readonly rateMovieUseCase: RateMovieUseCase,
    @Inject(REMOVE_MOVIE_RATING_USE_CASE)
    private readonly removeRatingUseCase: RemoveMovieRatingUseCase,
    @Inject(GET_RATED_MOVIES_USE_CASE)
    private readonly ratedMovies: GetRatedMoviesUseCase,
  ) {}

  @AuthRequired()
  @ApiBadRequestResponse({ description: 'Invalid request body.' })
  @ApiNotFoundResponse({ description: 'Movie not found.' })
  @ApiConflictResponse({ description: 'Movie already rated.' })
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
  @ApiBadRequestResponse({ description: 'Invalid request body.' })
  @ApiNotFoundResponse({ description: 'Movie not found.' })
  @ApiConflictResponse({ description: 'Move not rated.' })
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

  @AuthRequired()
  @ApiNotFoundResponse({ description: 'Page not found.' })
  @Get('/me/movies/rating')
  async getFavouriteMovies(
    @Query('page') page: number,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return pipe(
      await this.ratedMovies.getRatedMovies(page, user.id),
      O.map((movie) => plainToClass(PaginatedMovieListResponseDto, movie)),
      O.getOrElse(() => {
        throw new NotFoundException('Page not found');
      }),
    );
  }
}
