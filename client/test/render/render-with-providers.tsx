import { render, RenderOptions } from '@testing-library/react-native';
import { AnonymousUser, User } from '../../src/shared/models/user/user';
import { QueryClient, QueryClientProvider } from 'react-query';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProviderMock } from '../mocks/context/auth-provider.mock';
import { AuthStorage } from '../../src/shared/services/storage/auth-storage.service';
import { createStackNavigator } from '@react-navigation/stack';

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

  const logoutUser = jest.fn();
  const authenticateUser = jest.fn();
  const Stack = createStackNavigator();

  return {
    ...render(
      <NavigationContainer>
        <AuthProviderMock
          defaultUser={user}
          logoutUser={logoutUser}
          authenticateUser={authenticateUser}
          authStorage={(null as unknown) as AuthStorage}
        >
          <QueryClientProvider client={queryClient}>
            <Stack.Navigator initialRouteName={'/'} headerMode="none">
              <Stack.Screen name={'/'}>{() => ui}</Stack.Screen>
            </Stack.Navigator>
          </QueryClientProvider>
        </AuthProviderMock>
      </NavigationContainer>,
    ),
    queryClient,
    logoutUser,
    authenticateUser,
  };
};
