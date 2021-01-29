import { Controller, Get, Inject, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  ASK_PLOT_QUESTION_USE_CASE,
  AskPlotQuestionUseCase,
} from '../../../application/port/in/query/ask-plot-question.use-case';
import { Id } from '../../../../common/params/id';

@Controller()
@ApiTags('movie')
export class MoviePlotQuestionController {
  constructor(
    @Inject(ASK_PLOT_QUESTION_USE_CASE)
    private readonly askPlotQuestionUseCase: AskPlotQuestionUseCase,
  ) {}

  @Get('/movies/:id/plot-question')
  askPlotQuestion(@Id() movieId: number, @Query('question') question: string) {
    return this.askPlotQuestionUseCase.askPlotQuestion(movieId, question);
  }
}
