export class MovieDetailsReadModel {
  readonly budget: number;
  readonly id: number;
  readonly imdbId: string;
  readonly overview: string;
  readonly posterPath: string | null;
  readonly releaseDate: string;
  readonly revenue: number;
  readonly runtime: number | null;
  readonly title: string;
  readonly isFavourite: boolean;
  readonly userRating: number | null;
  readonly averageRating: number | null;

  constructor(partial?: Partial<MovieDetailsReadModel>) {
    this.posterPath = partial.posterPath;
    this.budget = partial.budget;
    this.id = partial.id;
    this.imdbId = partial.imdbId;
    this.overview = partial.overview;
    this.releaseDate = partial.releaseDate;
    this.revenue = partial.revenue;
    this.runtime = partial.runtime;
    this.title = partial.title;
    this.isFavourite = partial.isFavourite;
    this.userRating = partial.userRating;
    this.averageRating = partial.averageRating;
  }
}
