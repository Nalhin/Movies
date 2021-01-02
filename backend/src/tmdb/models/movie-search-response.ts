export interface MovieSearchResponse {
  page: number;
  results: MovieItemResponse[];
  totalResults: number;
  totalPages: number;
}

export interface MovieItemResponse {
  posterPath: string;
  adult: boolean;
  overview: string;
  releaseDate: string;
  genreIds: number[];
  id: number;
  originalTitle: string;
  originalLanguage: string;
  title: string;
  backdropPath: string;
  popularity: number;
  voteCount: number;
  video: boolean;
  voteAverage: number;
}
