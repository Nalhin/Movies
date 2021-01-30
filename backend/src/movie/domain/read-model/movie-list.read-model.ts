export class MovieListReadModel {
  posterPath: string;
  adult: boolean;
  overview: string;
  releaseDate: string;
  id: number;
  originalTitle: string;
  originalLanguage: string;
  title: string;
  backdropPath: string;
  popularity: number;
  voteCount: number;
  isFavourite: boolean;
  userRating: number | null;
  averageRating: number | null;

  constructor(partial?: Partial<MovieListReadModel>) {
    Object.assign(this, partial);
  }
}
