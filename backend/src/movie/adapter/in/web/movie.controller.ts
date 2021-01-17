import { Controller, Get, Inject, Param, Query } from '@nestjs/common';
import {
  ASK_PLOT_QUESTION_USE_CASE,
  AskPlotQuestionUseCase,
} from '../../../application/port/in/query/ask-plot-question.use-case';
import {
  GET_MOVIE_DETAILS_USE_CASE,
  GetMovieDetailsUseCase,
} from '../../../application/port/in/query/get-movie-details.use-case';
import { User } from '../../../../user/user.entity';
import { CurrentUser } from '../../../../common/decorators/current-user.decorator';
import {
  GET_MOVIES_USE_CASE,
  GetMoviesUseCase,
} from '../../../application/port/in/query/get-movies-use-case';
import { plainToClass } from 'class-transformer';
import { MovieListResponseDto } from './dto/movie-list-response.dto';
import { AuthOptional } from '../../../../common/decorators/auth-optional.decorator';
import { MovieDetailsResponseDto } from './dto/movie-details-response.dto';
import {
  GET_POPULAR_MOVIES_USE_CASE,
  GetPopularMoviesUseCase,
} from '../../../application/port/in/query/get-popular-movies.use-case';
import {
  GET_SIMILAR_MOVIES_USE_CASE,
  GetSimilarMoviesUseCase,
} from '../../../application/port/in/query/get-similar-movies.use-case';

@Controller()
export class MovieController {
  constructor(
    @Inject(ASK_PLOT_QUESTION_USE_CASE)
    private readonly askPlotQuestionUseCase: AskPlotQuestionUseCase,
    @Inject(GET_MOVIE_DETAILS_USE_CASE)
    private readonly getMovieDetailsUseCase: GetMovieDetailsUseCase,
    @Inject(GET_MOVIES_USE_CASE)
    private readonly getMoviesUseCase: GetMoviesUseCase,
    @Inject(GET_POPULAR_MOVIES_USE_CASE)
    private readonly getPopularMoviesUseCase: GetPopularMoviesUseCase,
    @Inject(GET_SIMILAR_MOVIES_USE_CASE)
    private readonly getSimilarMoviesUseCase: GetSimilarMoviesUseCase,
  ) {}

  @Get('/movies/:id/plot-question')
  askPlotQuestion(
    @Param('id') movieId: number,
    @Query('question') question: string,
  ) {
    return this.askPlotQuestionUseCase.askPlotQuestion(movieId, question);
  }

  @AuthOptional()
  @Get('/movies/:id')
  async getMovieById(@Param('id') movieId: number, @CurrentUser() user?: User) {
    return plainToClass(
      MovieDetailsResponseDto,
      await this.getMovieDetailsUseCase.getMovieDetails(movieId, user?.id),
    );
  }

  @AuthOptional()
  @Get('/movies')
  async getMovies(
    @Query('page') page: number,
    @Query('search') search: string,
    @CurrentUser() user?: User,
  ) {
    return plainToClass(
      MovieListResponseDto,
      await this.getMoviesUseCase.getMovies(search, page, user?.id),
    );
  }

  @AuthOptional()
  @Get('/movies/popular')
  async getPopularMovies(@CurrentUser() user?: User) {
    return plainToClass(
      MovieListResponseDto,
      await this.getPopularMoviesUseCase.getPopularMovies(user?.id),
    );
  }

  @AuthOptional()
  @Get('/movies/:id/similar')
  async getSimilarMovies(
    @Param('id') movieId: number,
    @CurrentUser() user?: User,
  ) {
    return plainToClass(
      MovieListResponseDto,
      await this.getSimilarMoviesUseCase.getSimilarMovies(movieId, user?.id),
    );
  }
}
