import {
  MovieDetailsResponseDto,
  MovieListResponseDto,
  PaginatedMovieListResponseDto,
} from '../../../../src/core/api/api.types';
import { rest } from 'msw';

export const getPopularMoviesPageApiMock = (
  response: PaginatedMovieListResponseDto,
) => {
  return rest.get('*/api/movies/popular', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(response));
  });
};

export const getSearchMoviesPageApiMock = (
  response: PaginatedMovieListResponseDto,
) => {
  return rest.get('*/api/movies', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(response));
  });
};

export const getSimilarMoviesApiMock = (
  response: MovieListResponseDto[],
  movieId: number,
) => {
  return rest.get(`*/api/movies/${movieId}/similar`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(response));
  });
};

export const getMovieDetailsApiMock = (
  response: MovieDetailsResponseDto,
  movieId: number,
) => {
  return rest.get(`*/api/movies/${movieId}`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(response));
  });
};
