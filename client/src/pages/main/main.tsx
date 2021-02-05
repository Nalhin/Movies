import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Popular from './popular/popular';
import SearchMovies from './search-movies/search-movies';
import { MAIN_ROUTES } from './main.routes';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Tab = createBottomTabNavigator();

const Main = () => {
  return (
    <Tab.Navigator initialRouteName={MAIN_ROUTES.POPULAR}>
      <Tab.Screen
        name={MAIN_ROUTES.POPULAR}
        component={Popular}
        options={{
          tabBarLabel: 'Popular',
          tabBarIcon: ({ color, size }) => (
            <Icon name="fire" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name={MAIN_ROUTES.SEARCH_MOVIES}
        component={SearchMovies}
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({ color, size }) => (
            <Icon name="search" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Main;
