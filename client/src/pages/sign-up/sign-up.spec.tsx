import { setupServer } from 'msw/node';
import { SignUpRequestDto } from '../../core/api/api.types';
import { renderWithNavigation } from '../../../test/render/render-with-providers';
import { fireEvent, waitFor } from '@testing-library/react-native';
import {
  postSignUpErrorApiMock,
  postSignUpSuccessApiMock,
} from '../../../test/mocks/api/auth.mock';
import { signUpRequestFactory } from '../../../test/factory/api/auth.factory';
import Login from '../login/login';
import React from 'react';
import SignUp from './sign-up';

describe('SignUp Page', () => {
  const server = setupServer();

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  function submitForm(
    { username, password, email }: SignUpRequestDto,
    rr: ReturnType<typeof renderWithNavigation>,
  ) {
    fireEvent.changeText(rr.getByLabelText(/username/i), username);
    fireEvent.changeText(rr.getByLabelText(/password/i), password);
    fireEvent.changeText(rr.getByLabelText(/email/i), email);
    fireEvent.press(rr.getByRole('button'));
  }

  it('should authenticate user after successful login', async () => {
    server.use(postSignUpSuccessApiMock({ token: 'token' }));
    const formState = signUpRequestFactory.buildOne();
    const rr = renderWithNavigation(<SignUp />);

    submitForm(formState, rr);

    await waitFor(() => {
      expect(rr.authenticateUser).toHaveBeenCalledTimes(1);
      expect(rr.authenticateUser).toHaveBeenCalledWith(
        {
          user: { username: formState.username, email: formState.email },
          token: 'token',
        },
        { onAuth: expect.any(Function) },
      );
    });
  });

  it('should not authenticate when login is unsuccessful', async () => {
    server.use(postSignUpErrorApiMock(401));
    const rr = renderWithNavigation(<SignUp />);

    submitForm(signUpRequestFactory.buildOne(), rr);

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
    const rr = renderWithNavigation(<SignUp />);

    fireEvent.press(rr.getByRole('button'));

    await waitFor(() =>
      expect(rr.getByText(/password is required/i)).toBeTruthy(),
    );
    expect(rr.authenticateUser).toHaveBeenCalledTimes(0);
  });

  it('should populate form with api errors when sign up responds with 400 status code', async () => {
    server.use(
      postSignUpErrorApiMock(400, {
        errors: [{ field: 'username', messages: ['username error'] }],
      }),
    );
    const rr = renderWithNavigation(<SignUp />);

    submitForm(signUpRequestFactory.buildOne(), rr);

    await waitFor(() => expect(rr.getByText(/username error/i)).toBeTruthy());
  });
});
