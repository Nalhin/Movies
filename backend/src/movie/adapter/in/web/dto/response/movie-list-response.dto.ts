import { Expose } from 'class-transformer';

export class MovieListResponseDto {
  @Expose()
  posterPath: string;
  @Expose()
  adult: boolean;
  @Expose()
  overview: string;
  @Expose()
  releaseDate: string;
  @Expose()
  id: number;
  @Expose()
  originalTitle: string;
  @Expose()
  originalLanguage: string;
  @Expose()
  title: string;
  @Expose()
  backdropPath: string;
  @Expose()
  popularity: number;
  @Expose()
  voteCount: number;

  @Expose()
  userRating: number | null;
  @Expose()
  isFavourite: boolean;
  @Expose()
  averageRating: number | null;
}
