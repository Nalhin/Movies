export interface MovieListResponseDto {
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
