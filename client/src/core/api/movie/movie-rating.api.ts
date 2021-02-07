import { axios } from '../axios';
import {
  PaginatedMovieListResponseDto,
  RateMovieRequestDto,
} from '../api.types';

export const postMovieRating = (body: RateMovieRequestDto, movieId: number) => {
  return axios.post<void>(`/movies/${movieId}/rating`, body);
};
export const deleteMovieRating = (movieId: number) =>
  axios.delete<void>(`/movies/${movieId}/rating`);

export const getRatedMoviesPage = (page: number) =>
  axios.get<PaginatedMovieListResponseDto>(`/me/movies/rating`, {
    params: { page },
  });
