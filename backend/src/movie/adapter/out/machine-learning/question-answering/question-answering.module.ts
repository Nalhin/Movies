import { Module } from '@nestjs/common';
import { QuestionAnsweringService } from './question-answering.service';

@Module({
  providers: [QuestionAnsweringService],
  exports: [QuestionAnsweringService],
})
export class QuestionAnsweringModule {}
