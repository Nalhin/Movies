import { render, RenderOptions } from '@testing-library/react-native';
import { AnonymousUser, User } from '../../src/shared/models/user/user';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthProvider } from '../../src/shared/context/auth/auth-provider/auth-provider';
import { AuthStorageService } from '../../src/shared/service/storage/auth-storage.service';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { authStorageMock } from '../mocks/auth-storage.mock-service';

interface CustomRenderOptions extends RenderOptions {
  user?: User;
}

export const renderWithProviders = (
  ui: JSX.Element,
  { user = new AnonymousUser() }: CustomRenderOptions = {},
) => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  return {
    ...render(
      <NavigationContainer>
        <AuthProvider
          defaultUser={user}
          authStorage={(authStorageMock as unknown) as AuthStorageService}
        >
          <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
        </AuthProvider>
      </NavigationContainer>,
    ),
    queryClient,
  };
};
