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
import { AuthRequired } from '../../../../common/decorators/auth-required.decorator';

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

  @Get('/movies/:id')
  getMovieById(@Param('id') movieId: number, @CurrentUser() user: User) {
    return this.getMovieDetailsUseCase.getMovieDetails(movieId, user.id);
  }

  @AuthRequired()
  @Get('/movies')
  async getMovies(
    @Query('page') page: number,
    @Query('search') search: string,
    @CurrentUser() user: User,
  ) {
    const resp = await this.getMoviesUseCase.getMovies(search, page, user?.id);
    return plainToClass(MovieListResponseDto, resp);
  }
}
