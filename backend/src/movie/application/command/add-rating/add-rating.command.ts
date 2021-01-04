export class AddRatingCommand {
  constructor(
    public readonly movieId: number,
    public readonly rating: number,
    public readonly userId: number,
  ) {}
}
