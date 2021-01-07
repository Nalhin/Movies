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

@Controller()
export class MovieController {
  constructor(
    @Inject(ASK_PLOT_QUESTION_USE_CASE)
    private readonly askPlotQuestionUseCase: AskPlotQuestionUseCase,
    @Inject(GET_MOVIE_DETAILS_USE_CASE)
    private readonly getMovieDetailsUseCase: GetMovieDetailsUseCase,
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
}
