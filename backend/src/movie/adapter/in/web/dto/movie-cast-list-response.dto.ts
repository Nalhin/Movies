import { Expose } from 'class-transformer';

export class MovieCastListResponseDto {
  @Expose()
  id: number;
  @Expose()
  name: string;
  @Expose()
  character: string;
  @Expose()
  profilePath: string;
}
