import { Expose } from 'class-transformer';

export class MovieDetailsResponseDto {
  @Expose()
  adult: boolean;
  @Expose()
  backdropPath: string;
  @Expose()
  budget: number;
  @Expose()
  homepage?: string;
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
  posterPath?: string;
}
