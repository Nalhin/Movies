export interface QuestionAnsweringPort {
  answerQuestion(question: string, text: string): Promise<string | null>;
}

export const QUESTION_ANSWERING = Symbol('QUESTION_ANSWERING');
