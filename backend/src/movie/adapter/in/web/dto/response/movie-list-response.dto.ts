import { Expose } from 'class-transformer';
import { Paginated } from './paginated';

export class MovieListResponseDto {
  @Expose()
  posterPath: string;
  @Expose()
  overview: string;
  @Expose()
  releaseDate: string;
  @Expose()
  id: number;
  @Expose()
  title: string;
  @Expose()
  userRating: number | null;
  @Expose()
  isFavourite: boolean;
  @Expose()
  averageRating: number | null;
}

export class PaginatedMovieListResponseDto extends Paginated<MovieListResponseDto>(
  MovieListResponseDto,
) {}
