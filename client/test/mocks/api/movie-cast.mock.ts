import { MovieCastListResponseDto } from '../../../src/core/api/api.types';
import { rest } from 'msw';

export const getMovieCastApiMock = (response: MovieCastListResponseDto[]) => {
  return rest.get('*/api/movies/:movieId/cast', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(response));
  });
};
