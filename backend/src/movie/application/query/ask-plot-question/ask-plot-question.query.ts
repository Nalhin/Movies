export class AskPlotQuestionQuery {
  constructor(
    public readonly movieId: number,
    public readonly question: string,
  ) {}
}
