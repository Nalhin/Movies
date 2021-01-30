import { axios } from '../axios';
import {
  MovieCastListResponseDto,
  MovieDetailsResponseDto,
  MovieListResponseDto,
  PaginatedMovieListResponseDto,
  PlotQuestionResponseDto,
  RateMovieRequestDto,
} from '../api.types';

export const postMovieRating = (body: RateMovieRequestDto, movieId: number) =>
  axios.post<void>(`/movies/${movieId}/rating`);

export const deleteMovieRating = (movieId: number) =>
  axios.delete<void>(`/movies/${movieId}/rating`);

export const postMovieFavourite = (movieId: number) =>
  axios.post<void>(`/movies/${movieId}/favourite`);

export const deleteMovieFavourite = (movieId: number) =>
  axios.delete<void>(`/movies/${movieId}/favourite`);

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

export const getMovieCast = (movieId: number) =>
  axios.get<MovieCastListResponseDto[]>(`/movies/${movieId}/cast`);

export const getPlotQuestion = (movieId: number, question: string) =>
  axios.get<PlotQuestionResponseDto>(`/movies/${movieId}/plot-question`, {
    params: { question },
  });
