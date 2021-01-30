import { Module } from '@nestjs/common';
import { NlpQuestionAsweringService } from './nlp-question-aswering.service';
import { ConfigModule } from '@nestjs/config';
import { questionAnsweringConfig } from '../../../../../core/config/question-answering.config';

@Module({
  imports: [ConfigModule.forFeature(questionAnsweringConfig)],
  providers: [NlpQuestionAsweringService],
  exports: [NlpQuestionAsweringService, ConfigModule],
})
export class NlpQuestionAnsweringModule {}
