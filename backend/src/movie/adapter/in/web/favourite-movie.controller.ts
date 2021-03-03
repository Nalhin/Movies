import {
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
  GET_FAVOURITE_MOVIES_USE_CASE,
  GetFavouriteMoviesUseCase,
} from '../../../application/port/in/query/get-favourite-movies.use-case';

@Controller()
@ApiTags('movie')
export class FavouriteMovieController {
  constructor(
    @Inject(ADD_FAVOURITE_MOVIE_USE_CASE)
    private readonly addFavouriteMovieUseCase: AddFavouriteMovieUseCase,
    @Inject(REMOVE_FAVOURITE_MOVIE_USE_CASE)
    private readonly removeFavouriteMovieUseCase: RemoveFavouriteMovieUseCase,
    @Inject(GET_FAVOURITE_MOVIES_USE_CASE)
    private readonly getFavouriteMoviesUseCase: GetFavouriteMoviesUseCase,
  ) {}

  @AuthRequired()
  @HttpCode(HttpStatus.OK)
  @ApiBadRequestResponse({ description: 'Invalid request body.' })
  @ApiNotFoundResponse({ description: 'Movie not found.' })
  @ApiConflictResponse({ description: 'Movie already marked as favourite.' })
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
          default:
            throw new InternalServerErrorException('Unexpected error');
        }
      }),
    );
  }

  @AuthRequired()
  @ApiBadRequestResponse({ description: 'Invalid request body.' })
  @ApiNotFoundResponse({ description: 'Movie not found.' })
  @ApiConflictResponse({ description: 'Movie not marked as favourite.' })
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
          default:
            throw new InternalServerErrorException('Unexpected error');
        }
      }),
    );
  }

  @AuthRequired()
  @ApiNotFoundResponse({ description: 'Page not found.' })
  @Get('/me/movies/favourite')
  async getFavouriteMovies(
    @Query('page') page: number,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return pipe(
      await this.getFavouriteMoviesUseCase.getFavouriteMovies(page, user.id),
      O.map((movie) => plainToClass(PaginatedMovieListResponseDto, movie)),
      O.getOrElse(() => {
        throw new NotFoundException('Page not found');
      }),
    );
  }
}
