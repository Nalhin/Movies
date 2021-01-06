export interface QuestionAnsweringPort {
  answerQuestion(question: string, text: string): Promise<string | null>;
}
