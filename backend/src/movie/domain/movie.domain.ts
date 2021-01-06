export class Movie {
  private imdbId: string;
  private title: string;
  private userRating: number | null;
  isFavourite: boolean;

  public addUserRating(rating: number) {
    this.userRating = rating;
  }

  public get isAlreadyRated() {
    return this.userRating == null;
  }
}
