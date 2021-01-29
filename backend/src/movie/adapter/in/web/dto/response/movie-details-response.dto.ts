import { Expose } from 'class-transformer';

export class MovieDetailsResponseDto {
  @Expose()
  adult: boolean;
  @Expose()
  backdropPath: string;
  @Expose()
  budget: number;
  @Expose()
  id: number;
  @Expose()
  imdbId: string;
  @Expose()
  originalLanguage: string;
  @Expose()
  originalTitle: string;
  @Expose()
  overview: string;
  @Expose()
  popularity: number;
  @Expose()
  posterPath: string | null;
  @Expose()
  releaseDate: string;
  @Expose()
  revenue: number;
  @Expose()
  runtime: number | null;
  @Expose()
  tagline: string | null;
  @Expose()
  title: string;
  @Expose()
  video: boolean;

  @Expose()
  isFavourite: boolean;
  @Expose()
  userRating: number | null;
  @Expose()
  averageRating: number | null;

  @Expose()
  voteAverage: number;
  @Expose()
  voteCount: number;
}
