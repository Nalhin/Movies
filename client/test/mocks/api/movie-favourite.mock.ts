import { PaginatedMovieListResponseDto } from '../../../src/core/api/api.types';
import { rest } from 'msw';

export const getFavouriteMoviesPageApiMock = (
  response: PaginatedMovieListResponseDto,
) => {
  return rest.get('*/api/me/movies/favourite', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(response));
  });
};
