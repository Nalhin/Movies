import { Module } from '@nestjs/common';
import { QuestionAnsweringAdapter } from './question-answering.adapter';
import { ConfigModule } from '@nestjs/config';
import { questionAnsweringConfig } from '../../../../../core/config/question-answering.config';

@Module({
  imports: [ConfigModule.forFeature(questionAnsweringConfig)],
  providers: [QuestionAnsweringAdapter],
  exports: [QuestionAnsweringAdapter, ConfigModule],
})
export class QuestionAnsweringModule {}
