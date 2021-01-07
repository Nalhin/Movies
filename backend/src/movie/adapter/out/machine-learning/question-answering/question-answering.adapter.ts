import { Injectable, OnModuleInit } from '@nestjs/common';
import { load, QuestionAndAnswer } from '@tensorflow-models/qna';
import { QuestionAnsweringPort } from '../../../../application/port/out/question-answering.port';

@Injectable()
export class QuestionAnsweringAdapter
  implements OnModuleInit, QuestionAnsweringPort {
  private model: QuestionAndAnswer;

  public async onModuleInit(): Promise<void> {
    await require('@tensorflow/tfjs-node');
    this.model = await load();
  }

  public async answerQuestion(
    question: string,
    text: string,
  ): Promise<string | null> {
    const answers = await this.model.findAnswers(question, text);

    return answers.length > 0 ? answers[0].text : null;
  }
}
