import { Expose } from 'class-transformer';

export class MovieResponseDto {
  @Expose()
  title: string;
  @Expose()
  id: number;
  @Expose()
  overview: string;
}
