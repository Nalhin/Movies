import { PlotQuestionResponseDto } from '../../../src/core/api/api.types';
import { rest } from 'msw';

export const getPlotQuestionApiMock = (response: PlotQuestionResponseDto) => {
  return rest.get('*/api/movies/:movieId/plot-question', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(response));
  });
};
