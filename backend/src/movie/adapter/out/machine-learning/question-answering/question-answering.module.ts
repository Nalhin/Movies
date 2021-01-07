import { Module } from '@nestjs/common';
import { QuestionAnsweringAdapter } from './question-answering.adapter';

@Module({
  providers: [QuestionAnsweringAdapter],
  exports: [QuestionAnsweringAdapter],
})
export class QuestionAnsweringModule {}
