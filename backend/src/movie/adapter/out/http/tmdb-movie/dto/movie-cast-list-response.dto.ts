export interface MovieCastListResponseDto {
  adult: boolean;
  gender: number | null;
  id: number;
  knownForDepartment: string;
  name: string;
  originalName: string;
  popularity: number;
  profilePath: string;
  castId: number;
  character: string;
  creditId: string;
  order: number;
}

export interface MovieCastResponseDto {
  cast: MovieCastListResponseDto[];
}
