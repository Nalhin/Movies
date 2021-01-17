export interface MovieCastResponseDto {
  adult: boolean;
  gender: number | null;
  id: number;
  knownForDepartment: string;
  name: string;
  originalName: string;
  popularity: number;
  profilePath: number;
  castId: number;
  character: string;
  creditId: string;
  order: number;
}
