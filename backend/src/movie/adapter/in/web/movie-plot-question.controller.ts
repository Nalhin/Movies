import {
  Controller,
  Get,
  Inject,
  InternalServerErrorException,
  NotFoundException,
  Query,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  ASK_PLOT_QUESTION_USE_CASE,
  AskPlotQuestionErrors,
  AskPlotQuestionUseCase,
} from '../../../application/port/in/query/ask-plot-question.use-case';
import { Id } from '../../../../common/params/id';
import { pipe } from 'fp-ts/function';
import * as E from 'fp-ts/Either';
import { PlotQuestionResponseDto } from './dto/response/plot-question.response.dto';

@Controller()
@ApiTags('movie')
export class MoviePlotQuestionController {
  constructor(
    @Inject(ASK_PLOT_QUESTION_USE_CASE)
    private readonly askPlotQuestionUseCase: AskPlotQuestionUseCase,
  ) {}

  @Get('/movies/:id/plot-question')
  async askPlotQuestion(
    @Id() movieId: number,
    @Query('question') question: string,
  ) {
    return pipe(
      await this.askPlotQuestionUseCase.askPlotQuestion(movieId, question),
      E.fold(
        (e) => {
          switch (e) {
            case AskPlotQuestionErrors.MoviePlotNotFound:
              throw new NotFoundException('Movie plot not found');
            case AskPlotQuestionErrors.PlotQuestionNotAnswered:
              throw new UnprocessableEntityException(
                'Question could not be answered',
              );
            case AskPlotQuestionErrors.MovieNotFound:
              throw new NotFoundException('Movie not found');
            default:
              throw new InternalServerErrorException('Unexpected error');
          }
        },
        (ans) => new PlotQuestionResponseDto(ans),
      ),
    );
  }
}
