import {
  Controller,
  Get,
  Inject,
  NotFoundException,
  Query,
} from '@nestjs/common';
import {
  GET_MOVIE_DETAILS_USE_CASE,
  GetMovieDetailsUseCase,
} from '../../../application/port/in/query/get-movie-details.use-case';
import { CurrentUser } from '../../../../common/decorators/current-user.decorator';
import {
  GET_MOVIES_USE_CASE,
  GetMoviesUseCase,
} from '../../../application/port/in/query/get-movies-use-case';
import { plainToClass } from 'class-transformer';
import {
  MovieListResponseDto,
  PaginatedMovieListResponseDto,
} from './dto/response/movie-list-response.dto';
import { AuthOptional } from '../../../../common/decorators/auth-optional.decorator';
import { MovieDetailsResponseDto } from './dto/response/movie-details-response.dto';
import {
  GET_POPULAR_MOVIES_USE_CASE,
  GetPopularMoviesUseCase,
} from '../../../application/port/in/query/get-popular-movies.use-case';
import {
  GET_SIMILAR_MOVIES_USE_CASE,
  GetSimilarMoviesUseCase,
} from '../../../application/port/in/query/get-similar-movies.use-case';
import { ApiTags } from '@nestjs/swagger';
import { AppUser } from '../../../../common/model/app-user.model';
import { Id } from '../../../../common/params/id';
import { pipe } from 'fp-ts/function';
import * as O from 'fp-ts/Option';

@Controller()
@ApiTags('movie')
export class MovieController {
  constructor(
    @Inject(GET_MOVIE_DETAILS_USE_CASE)
    private readonly getMovieDetailsUseCase: GetMovieDetailsUseCase,
    @Inject(GET_MOVIES_USE_CASE)
    private readonly getMoviesUseCase: GetMoviesUseCase,
    @Inject(GET_POPULAR_MOVIES_USE_CASE)
    private readonly getPopularMoviesUseCase: GetPopularMoviesUseCase,
    @Inject(GET_SIMILAR_MOVIES_USE_CASE)
    private readonly getSimilarMoviesUseCase: GetSimilarMoviesUseCase,
  ) {}

  @AuthOptional()
  @Get('/movies/:id(\\d+)')
  async getMovieById(@Id() movieId: number, @CurrentUser() user?: AppUser) {
    return pipe(
      await this.getMovieDetailsUseCase.getMovieDetails(movieId, user?.id),
      O.map((movie) => plainToClass(MovieDetailsResponseDto, movie)),
      O.getOrElse(() => {
        throw new NotFoundException('Movie not found');
      }),
    );
  }

  @AuthOptional()
  @Get('/movies')
  async getMovies(
    @Query('page') page: number,
    @Query('search') search: string,
    @CurrentUser() user: AppUser,
  ) {
    return pipe(
      await this.getMoviesUseCase.getMovies(search, page, user?.id),
      O.map((movie) => plainToClass(PaginatedMovieListResponseDto, movie)),
      O.getOrElse(() => {
        throw new NotFoundException('Page not found');
      }),
    );
  }

  @AuthOptional()
  @Get('/movies/popular')
  async getPopularMovies(
    @Query('page') page: number,
    @CurrentUser() user: AppUser,
  ) {
    return pipe(
      await this.getPopularMoviesUseCase.getPopularMovies(page, user?.id),
      O.map((movie) => plainToClass(PaginatedMovieListResponseDto, movie)),
      O.getOrElse(() => {
        throw new NotFoundException('Page not found');
      }),
    );
  }

  @AuthOptional()
  @Get('/movies/:id/similar')
  async getSimilarMovies(@Id() movieId: number, @CurrentUser() user: AppUser) {
    return pipe(
      await this.getSimilarMoviesUseCase.getSimilarMovies(movieId, user?.id),
      O.map((movie) => plainToClass(MovieListResponseDto, movie)),
      O.getOrElse(() => {
        throw new NotFoundException('Movie not found');
      }),
    );
  }
}
