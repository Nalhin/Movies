import { Injectable, OnModuleInit } from '@nestjs/common';
import { QuestionAnsweringPort } from '../../../../application/port/out/question-answering.port';
import { QuestionAndAnswer } from '@tensorflow-models/qna';
import * as O from 'fp-ts/Option';

@Injectable()
export class QuestionAnsweringAdapter
  implements OnModuleInit, QuestionAnsweringPort {
  private model: QuestionAndAnswer;

  public async onModuleInit(): Promise<void> {
    if (process.env.NODE_ENV === 'production') {
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
