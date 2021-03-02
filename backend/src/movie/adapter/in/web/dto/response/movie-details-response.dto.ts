import { Expose } from 'class-transformer';

export class MovieDetailsResponseDto {
  @Expose()
  budget: number;
  @Expose()
  id: number;
  @Expose()
  imdbId: string;
  @Expose()
  overview: string;
  @Expose()
  posterPath: string | null;
  @Expose()
  releaseDate: string;
  @Expose()
  revenue: number;
  @Expose()
  runtime: number | null;
  @Expose()
  title: string;

  @Expose()
  isFavourite: boolean;
  @Expose()
  userRating: number | null;
  @Expose()
  averageRating: number | null;
}
