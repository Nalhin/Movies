export interface QuestionAnsweringAdapter {
  answerQuestion(question: string, text: string): Promise<string | null>;
}
