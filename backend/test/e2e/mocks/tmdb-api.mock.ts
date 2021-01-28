import { rest } from 'msw';
import { MovieListResponseDto } from '../../../src/movie/adapter/out/http/tmdb-movie/dto/movie-list-response.dto';
import { MovieDetailsResponseDto } from '../../../src/movie/adapter/out/http/tmdb-movie/dto/movie-details-response.dto';

export const queryMovies = (response: MovieListResponseDto) =>
  rest.get('/search/movie', (req, res, ctx) => {
    return res(ctx.json(response));
  });

export const getMovieById = (response: MovieDetailsResponseDto) =>
  rest.get('/movie/:id', (req, res, ctx) => {
    if (req.params.id != response.id) {
      return res(ctx.status(404));
    }

    return res(ctx.json(response));
  });

export const getSimilarMovies = (response: MovieListResponseDto) =>
  rest.get('/search/:id/movie', (req, res, ctx) => {
    return res(ctx.json(response));
  });

export const getPopularMovies = (response: MovieListResponseDto) =>
  rest.get('/movie/popular', (req, res, ctx) => {
    return res(ctx.json(response));
  });
