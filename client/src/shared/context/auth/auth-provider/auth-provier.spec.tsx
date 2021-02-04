import React from 'react';
import { AuthProvider } from './auth-provider';
import { useAuthState } from '../use-auth-state/use-auth-state';
import { mocked } from 'ts-jest/utils';
import { render } from '@testing-library/react-native';
import { Text } from 'react-native';
import { AuthStorageMock } from '../../../../../test/mocks/services/auth-storage.mock';

jest.mock('../use-auth-state/use-auth-state');

describe('authProvider', () => {
  it('should block rendering when user is being fetched', async () => {
    mocked(useAuthState).mockReturnValue({
      isLoading: true,
    } as ReturnType<typeof useAuthState>);

    const { queryByText } = render(
      <AuthProvider authStorage={new AuthStorageMock()}>
        <Text>test</Text>
      </AuthProvider>,
    );

    expect(queryByText(/test/)).not.toBeTrue();
  });

  it('should render children after user is fetched', () => {
    mocked(useAuthState).mockReturnValue({
      isLoading: false,
    } as ReturnType<typeof useAuthState>);

    const { getByText } = render(
      <AuthProvider authStorage={new AuthStorageMock()}>
        <Text>test</Text>
      </AuthProvider>,
    );

    expect(getByText(/test/)).toBeTruthy();
  });
});
