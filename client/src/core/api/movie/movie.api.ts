import { axios } from '../axios';
import {
  MovieDetailsResponseDto,
  MovieListResponseDto,
  PaginatedMovieListResponseDto,
} from '../api.types';

export const getMovieById = (movieId: number) =>
  axios.get<MovieDetailsResponseDto>(`/movies/${movieId}`);

export const getSearchMoviesPage = (page: number, search: string) =>
  axios.get<PaginatedMovieListResponseDto>('/movies', {
    params: {
      page,
      search,
    },
  });

export const getPopularMoviesPage = (page: number) =>
  axios.get<PaginatedMovieListResponseDto>(`/movies/popular`, {
    params: { page },
  });

export const getSimilarMovies = (movieId: number) =>
  axios.get<MovieListResponseDto[]>(`/movies/${movieId}/similar`);
