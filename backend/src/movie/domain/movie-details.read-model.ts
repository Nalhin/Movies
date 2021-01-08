export class MovieDetailsReadModel {
  adult: boolean;
  backdropPath: string;
  budget: number;
  id: number;
  imdbId: string;
  originalLanguage: string;
  originalTitle: string;
  overview: string;
  popularity: number;
  posterPath: string | null;
  releaseDate: string;
  revenue: number;
  runtime: number | null;
  tagline: string | null;
  title: string;
  video: boolean;
  isFavourite: boolean;
  userRating: number | null;
  averageRating: number | null;
  voteAverage: number;
  voteCount: number;

  constructor(partial?: Partial<MovieDetailsReadModel>) {
    Object.assign(this, partial);
  }
}
