import { setupServer } from 'msw/node';
import { LoginRequestDto } from '../../core/api/api.types';
import { renderWithNavigation } from '../../../test/render/render-with-providers';
import React from 'react';
import Login from './login';
import { loginUserFactory } from '../../../test/factory/api/auth.factory';
import { fireEvent, waitFor } from '@testing-library/react-native';
import {
  postLoginErrorApiMock,
  postLoginSuccessApiMock,
} from '../../../test/mocks/api/auth/auth.mock';

describe('Login Page', () => {
  const server = setupServer();

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  function submitForm(
    { username, password }: LoginRequestDto,
    rr: ReturnType<typeof renderWithNavigation>,
  ) {
    fireEvent.changeText(rr.getByLabelText(/username/i), username);
    fireEvent.changeText(rr.getByLabelText(/password/i), password);
    fireEvent.press(rr.getByRole('button'));
  }

  it('should authenticate user after successful login', async () => {
    server.use(postLoginSuccessApiMock({ email: 'email', token: 'token' }));
    const formState = loginUserFactory.buildOne();
    const rr = renderWithNavigation(<Login />);

    submitForm(formState, rr);

    await waitFor(() => {
      expect(rr.authenticateUser).toHaveBeenCalledTimes(1);
      expect(rr.authenticateUser).toHaveBeenCalledWith(
        {
          user: { username: formState.username, email: 'email' },
          token: 'token',
        },
        { onAuth: expect.any(Function) },
      );
    });
  });

  it('should not authenticate when login is unsuccessful', async () => {
    server.use(postLoginErrorApiMock(401));
    const rr = renderWithNavigation(<Login />);

    submitForm(loginUserFactory.buildOne(), rr);

    await waitFor(() => {
      expect(rr.getByRole('button')).not.toBeDisabled();
      expect(rr.authenticateUser).toHaveBeenCalledTimes(0);
    });
  });

  it('should display errors when form is invalid', async () => {
    const { getByRole, getByText } = renderWithNavigation(<Login />);

    fireEvent.press(getByRole('button'));

    await waitFor(() => {
      expect(getByText(/username is required/i)).toBeTruthy();
      expect(getByText(/password is required/i)).toBeTruthy();
    });
  });

  it('should not submit request when form is invalid', async () => {
    const rr = renderWithNavigation(<Login />);

    fireEvent.press(rr.getByRole('button'));

    await waitFor(() =>
      expect(rr.getByText(/password is required/i)).toBeTruthy(),
    );
    expect(rr.authenticateUser).toHaveBeenCalledTimes(0);
  });

  it('should populate form with api errors when login responds with BAD_REQUEST', async () => {
    server.use(
      postLoginErrorApiMock(400, {
        errors: [{ field: 'username', messages: ['username error'] }],
      }),
    );
    const rr = renderWithNavigation(<Login />);

    submitForm(loginUserFactory.buildOne(), rr);

    await waitFor(() => expect(rr.getByText(/username error/i)).toBeTruthy());
  });
});
