import { rest } from 'msw';
import { MovieItemResponse } from '../../../src/movie/adapter/out/http/tmdb-movie/dto/movie-list-response.dto';
import { MovieDetailsResponseDto } from '../../../src/movie/adapter/out/http/tmdb-movie/dto/movie-details-response.dto';
import { MovieCastResponseDto } from '../../../src/movie/adapter/out/http/tmdb-movie/dto/movie-cast-list-response.dto';
import { HttpStatus } from '@nestjs/common';

export const queryMovies = (
  response: MovieItemResponse[],
  totalPages: number,
) =>
  rest.get('/search/movie', (req, res, ctx) => {
    const page = Number(req.url.searchParams.get('page'));

    if (page > totalPages) {
      return res(ctx.status(HttpStatus.NOT_FOUND));
    }

    return res(
      ctx.json({
        page,
        results: response,
        totalResults: totalPages * 20,
        totalPages,
      }),
    );
  });

export const getMovieById = (response: MovieDetailsResponseDto) =>
  rest.get('/movie/:id', (req, res, ctx) => {
    if (req.params.id != response.id) {
      return res(ctx.status(HttpStatus.NOT_FOUND));
    }

    return res(ctx.json(response));
  });

export const getSimilarMovies = (
  response: MovieItemResponse[],
  movieId: number,
) =>
  rest.get('/movie/:id/similar', (req, res, ctx) => {
    if (req.params.id != movieId) {
      return res(ctx.status(HttpStatus.NOT_FOUND));
    }

    return res(ctx.json({ results: response }));
  });

export const getPopularMovies = (
  response: MovieItemResponse[],
  totalPages: number,
) =>
  rest.get('/movie/popular', (req, res, ctx) => {
    const page = Number(req.url.searchParams.get('page'));

    if (page > totalPages) {
      return res(ctx.status(HttpStatus.NOT_FOUND));
    }

    return res(
      ctx.json({
        page,
        results: response,
        totalResults: totalPages * 20,
        totalPages,
      }),
    );
  });

export const getMovieCast = (response: MovieCastResponseDto, movieId: number) =>
  rest.get('/movie/:id/credits', (req, res, ctx) => {
    if (req.params.id != movieId) {
      return res(ctx.status(HttpStatus.NOT_FOUND));
    }

    return res(ctx.json(response));
  });
