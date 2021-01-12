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

@Controller()
export class MovieController {
  constructor(
    @Inject(ASK_PLOT_QUESTION_USE_CASE)
    private readonly askPlotQuestionUseCase: AskPlotQuestionUseCase,
    @Inject(GET_MOVIE_DETAILS_USE_CASE)
    private readonly getMovieDetailsUseCase: GetMovieDetailsUseCase,
    @Inject(GET_MOVIES_USE_CASE)
    private readonly getMoviesUseCase: GetMoviesUseCase,
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
}
