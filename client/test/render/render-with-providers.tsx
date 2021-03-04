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
import { View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

interface CustomBaseRenderOptions extends RenderOptions {
  user?: User;
}

export const renderWithBaseProviders = (
  ui: JSX.Element,
  { user = new AnonymousUser() }: CustomBaseRenderOptions = {},
) => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  const logoutUser = jest.fn();
  const authenticateUser = jest.fn();

  return {
    ...render(
      <AuthProviderMock
        defaultUser={user}
        logoutUser={logoutUser}
        authenticateUser={authenticateUser}
        authStorage={(null as unknown) as AuthStorage}
      >
        <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
      </AuthProviderMock>,
    ),
    queryClient,
    logoutUser,
    authenticateUser,
  };
};

interface CustomNavigationRenderOptions extends CustomBaseRenderOptions {
  user?: User;
  screens?: string[];
  routeParams?: Record<string, unknown>;
}

const Stack = createStackNavigator();

export const renderWithNavigation = (
  ui: JSX.Element,
  {
    user = new AnonymousUser(),
    screens = [],
    routeParams = {},
  }: CustomNavigationRenderOptions = {},
) => {
  const navigationRef = React.createRef<NavigationContainerRef>();

  return {
    ...renderWithBaseProviders(
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator initialRouteName="/" headerMode="none">
          <Stack.Screen name="/" initialParams={routeParams}>
            {(props) => React.cloneElement(ui, { ...ui.props, ...props })}
          </Stack.Screen>
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
      </NavigationContainer>,
      { user },
    ),
    navigation: navigationRef.current as NavigationContainerRef,
  };
};
