import { Injectable, OnModuleInit } from '@nestjs/common';
import { QuestionAnsweringPort } from '../../../../application/port/out/question-answering.port';
import { QuestionAndAnswer } from '@tensorflow-models/qna';
import * as O from 'fp-ts/Option';
import { Inject } from '@nestjs/common/decorators/core';
import {
  QuestionAnsweringConfig,
  questionAnsweringConfig,
} from '../../../../../core/config/question-answering.config';

@Injectable()
export class QuestionAnsweringAdapter
  implements OnModuleInit, QuestionAnsweringPort {
  private model: QuestionAndAnswer;

  constructor(
    @Inject(questionAnsweringConfig.KEY)
    private qaConfig: QuestionAnsweringConfig,
  ) {}

  public async onModuleInit(): Promise<void> {
    if (this.qaConfig.enableML) {
      await require('@tensorflow/tfjs-node');
      const { load } = await require('@tensorflow-models/qna');
      this.model = await load();
    }
  }

  public async answerQuestion(
    question: string,
    text: string,
  ): Promise<O.Option<string>> {
    const answers = await this.model.findAnswers(question, text);

    return answers.length > 0 ? O.some(answers[0].text) : O.none;
  }
}
