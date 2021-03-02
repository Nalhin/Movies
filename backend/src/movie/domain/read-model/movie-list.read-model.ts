export class MovieListReadModel {
  readonly overview: string;
  readonly releaseDate: string;
  readonly id: number;
  readonly title: string;
  readonly posterPath: string | null;
  readonly isFavourite: boolean;
  readonly userRating: number | null;
  readonly averageRating: number | null;

  constructor(partial?: Partial<MovieListReadModel>) {
    this.id = partial.id;
    this.posterPath = partial.posterPath;
    this.overview = partial.overview;
    this.releaseDate = partial.releaseDate;
    this.title = partial.title;
    this.isFavourite = partial.isFavourite;
    this.userRating = partial.userRating;
    this.averageRating = partial.averageRating;
  }
}
