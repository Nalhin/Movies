import { Injectable, OnModuleInit } from '@nestjs/common';
import { load, QuestionAndAnswer } from '@tensorflow-models/qna';
import '@tensorflow/tfjs-node';

@Injectable()
export class QuestionAnsweringService implements OnModuleInit {
  private model: QuestionAndAnswer;

  public async onModuleInit(): Promise<void> {
    this.model = await load();
  }

  public async answerQuestion(
    question: string,
    test: string,
  ): Promise<string | null> {
    const answers = await this.model.findAnswers(question, test);

    return answers.length > 0 ? answers[0].text : null;
  }
}
