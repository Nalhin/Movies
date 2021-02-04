import { rest } from 'msw';
import { LoginRequestDto } from '../../../src/core/api/api.types';

export const postLoginSuccessApiMock = ({
  token,
  email,
}: {
  email: string;
  token: string;
}) =>
  rest.post<LoginRequestDto>('*/api/auth/login', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        user: { username: req.body.username, email },
        token,
      }),
    );
  });

export const postLoginErrorApiMock = (errorCode: number, response?: any) =>
  rest.post('*/api/auth/login', (req, res, ctx) => {
    return res(ctx.status(errorCode), ctx.json(response));
  });
