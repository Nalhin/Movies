import { IsInt, Max, Min } from 'class-validator';

export class RateMovieRequestDto {
  @IsInt()
  @Min(0)
  @Max(10)
  score: number;
}
