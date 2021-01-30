import { Expose } from 'class-transformer';

export class PlotQuestionResponseDto {
  @Expose()
  answer: string;

  constructor(answer: string) {
    this.answer = answer;
  }
}
