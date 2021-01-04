export class RemoveRatingCommand {
  constructor(
    private readonly movieId: number,
    private readonly userId: number,
  ) {}
}
