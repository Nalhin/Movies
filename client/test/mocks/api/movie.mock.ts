import { PaginatedMovieListResponseDto } from '../../../src/core/api/api.types';
import { rest } from 'msw';

export const getPopularMoviesPageApiMock = (
  response: PaginatedMovieListResponseDto,
) => {
  return rest.get('*/api/movies/popular', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(response));
  });
};
