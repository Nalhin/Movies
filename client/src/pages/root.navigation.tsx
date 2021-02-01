import React from 'react';
import Home from './home/home';
import Login from './login/login';
import SignUp from './sign-up/sign-up';
import { createStackNavigator } from '@react-navigation/stack';
import Main from './main/main';
import tailwind from 'tailwind-rn';
import { ROOT_ROUTES } from './root.routes';

const Stack = createStackNavigator();

const RootNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName={ROOT_ROUTES.HOME}
      headerMode="none"
      screenOptions={{ cardStyle: tailwind('bg-white') }}
    >
      <Stack.Screen name={ROOT_ROUTES.HOME} component={Home} />
      <Stack.Screen name={ROOT_ROUTES.LOGIN} component={Login} />
      <Stack.Screen name={ROOT_ROUTES.SIGN_UP} component={SignUp} />
      <Stack.Screen name={ROOT_ROUTES.MAIN} component={Main} />
    </Stack.Navigator>
  );
};

export default RootNavigation;
