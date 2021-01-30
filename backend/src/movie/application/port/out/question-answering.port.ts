import * as O from 'fp-ts/Option';

export interface QuestionAnsweringPort {
  answerQuestion(question: string, text: string): Promise<O.Option<string>>;
}

export const QUESTION_ANSWERING_PORT = Symbol('QUESTION_ANSWERING_PORT');
