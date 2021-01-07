export class Movie {
  constructor(
    public readonly id: number,
    public readonly imdbId: string,
    public readonly title: string,
    public readonly userRating: number | null,
    public readonly isFavourite: boolean,
  ) {}

  public addUserRating(rating: number) {
    return new Movie(
      this.id,
      this.imdbId,
      this.title,
      rating,
      this.isFavourite,
    );
  }

  public markAsFavourite() {
    if (this.isFavourite) {
      throw new Error('Movie is already marked as favourite');
    }

    return new Movie(this.id, this.imdbId, this.title, this.userRating, true);
  }

  public removeFromFavourites() {
    if (!this.isFavourite) {
      throw new Error('Movie is not marked as favourite');
    }

    return new Movie(this.id, this.imdbId, this.title, this.userRating, true);
  }
}
