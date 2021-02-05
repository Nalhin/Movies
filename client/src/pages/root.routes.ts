import { RouteProp } from '@react-navigation/native';

export const ROOT_ROUTES = {
  HOME: 'HOME',
  LOGIN: 'LOGIN',
  SIGN_UP: 'SIGN_UP',
  MAIN: 'MAIN',
  MOVIE_DETAILS: 'MOVIE_DETAILS',
} as const;

export type RootStackParamList = {
  HOME: undefined;
  LOGIN: undefined;
  SIGN_UP: undefined;
  MAIN: undefined;
  MOVIE_DETAILS: { movieId: number };
};

export type MovieDetailsRouteProps = RouteProp<
  RootStackParamList,
  'MOVIE_DETAILS'
>;
