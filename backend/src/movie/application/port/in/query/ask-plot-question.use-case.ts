import { Observable } from 'rxjs';

export interface AskPlotQuestionUseCase {
  askPlotQuestion(movieId: number, question: string): Observable<string>;
}

export const ASK_PLOT_QUESTION_USE_CASE = Symbol('ASK_PLOT_QUESTION_USE_CASE');
