import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PopularMovies from './popular-movies/popular-movies';
import SearchMovies from './search-movies/search-movies';
import { MAIN_ROUTES } from './main.routes';
import Icon from 'react-native-vector-icons/FontAwesome5';
import FavouriteMovies from './favourite-movies/favourite-movies';

const Tab = createBottomTabNavigator();

const Main = () => {
  return (
    <Tab.Navigator initialRouteName={MAIN_ROUTES.POPULAR_MOVIES}>
      <Tab.Screen
        name={MAIN_ROUTES.POPULAR_MOVIES}
        component={PopularMovies}
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
      <Tab.Screen
        name={MAIN_ROUTES.FAVOURITE_MOVIES}
        component={FavouriteMovies}
        options={{
          tabBarLabel: 'Favourite',
          tabBarIcon: ({ color, size }) => (
            <Icon name="heart" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Main;
