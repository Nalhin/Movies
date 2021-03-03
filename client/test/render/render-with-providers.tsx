import { render, RenderOptions } from '@testing-library/react-native';
import { AnonymousUser, User } from '../../src/shared/models/user/user';
import { QueryClient, QueryClientProvider } from 'react-query';
import React from 'react';
import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import { AuthProviderMock } from '../mocks/context/auth-provider.mock';
import { AuthStorage } from '../../src/shared/services/storage/auth-storage.service';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text } from 'react-native';

interface CustomRenderOptions extends RenderOptions {
  user?: User;
  screens?: string[];
}

export const renderWithProviders = (
  ui: JSX.Element,
  { user = new AnonymousUser(), screens = [] }: CustomRenderOptions = {},
) => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  const logoutUser = jest.fn();
  const authenticateUser = jest.fn();
  const Stack = createStackNavigator();

  const navigationRef = React.createRef<NavigationContainerRef>();

  return {
    ...render(
      <NavigationContainer ref={navigationRef}>
        <AuthProviderMock
          defaultUser={user}
          logoutUser={logoutUser}
          authenticateUser={authenticateUser}
          authStorage={(null as unknown) as AuthStorage}
        >
          <QueryClientProvider client={queryClient}>
            <Stack.Navigator initialRouteName="/" headerMode="none">
              <Stack.Screen name="/">{() => ui}</Stack.Screen>
              {screens.map((screen) => (
                <Stack.Screen key={screen} name={screen}>
                  {() => (
                    <View>
                      <Text>{screen}</Text>
                    </View>
                  )}
                </Stack.Screen>
              ))}
            </Stack.Navigator>
          </QueryClientProvider>
        </AuthProviderMock>
      </NavigationContainer>,
    ),
    queryClient,
    logoutUser,
    authenticateUser,
    navigation: navigationRef.current as NavigationContainerRef,
  };
};
