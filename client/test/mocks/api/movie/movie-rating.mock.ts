import { PaginatedMovieListResponseDto } from '../../../../src/core/api/api.types';
import { rest } from 'msw';

export const getRatedMoviesPageApiMock = (
  response: PaginatedMovieListResponseDto,
) => {
  return rest.get('*/api/me/movies/rating', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(response));
  });
};
