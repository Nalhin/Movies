import * as O from 'fp-ts/Option';

export class Movie {
  constructor(
    public readonly id: number,
    public readonly imdbId: string,
    public readonly title: string,
    public readonly userRating: number | null,
    public readonly isFavourite: boolean,
  ) {}

  public rate(rating: number): O.Option<Movie> {
    if (this.userRating) {
      return O.none;
    }

    return O.some(
      new Movie(this.id, this.imdbId, this.title, rating, this.isFavourite),
    );
  }

  public removeRating(): O.Option<Movie> {
    if (!this.userRating) {
      return O.none;
    }
    return O.some(
      new Movie(this.id, this.imdbId, this.title, null, this.isFavourite),
    );
  }

  public markAsFavourite(): O.Option<Movie> {
    if (this.isFavourite) {
      return O.none;
    }

    return O.some(
      new Movie(this.id, this.imdbId, this.title, this.userRating, true),
    );
  }

  public removeFromFavourites(): O.Option<Movie> {
    if (!this.isFavourite) {
      return O.none;
    }

    return O.some(
      new Movie(this.id, this.imdbId, this.title, this.userRating, false),
    );
  }
}
