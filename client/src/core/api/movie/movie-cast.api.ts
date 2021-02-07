import { axios } from '../axios';
import { MovieCastListResponseDto } from '../api.types';

export const getMovieCast = (movieId: number) =>
  axios.get<MovieCastListResponseDto[]>(`/movies/${movieId}/cast`);
