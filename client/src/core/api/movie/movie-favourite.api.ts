import { axios } from '../axios';
import { PaginatedMovieListResponseDto } from '../api.types';

export const deleteMovieFavourite = (movieId: number) =>
  axios.delete<void>(`/movies/${movieId}/favourite`);

export const postMovieFavourite = (movieId: number) =>
  axios.post<void>(`/movies/${movieId}/favourite`);

export const getFavouriteMoviesPage = (page: number) =>
  axios.get<PaginatedMovieListResponseDto>(`/me/movies/favourite`, {
    params: { page },
  });
