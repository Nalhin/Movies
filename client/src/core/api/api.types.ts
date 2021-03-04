/* tslint:disable */
/* eslint-disable */

/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface LoginRequestDto {
  username: string;
  password: string;
}

export interface UserResponseDto {
  username: string;
  email: string;
}

export interface AuthResponseDto {
  user: UserResponseDto;
  token: string;
}

export interface SignUpRequestDto {
  username: string;
  password: string;
  email: string;
}

export interface RateMovieRequestDto {
  rating: number;
}

export interface MovieDetailsResponseDto {
  budget: number;
  id: number;
  imdbId: string;
  overview: string;
  posterPath: string | null;
  releaseDate: string;
  revenue: number;
  runtime: number | null;
  title: string;
  isFavourite: boolean;
  userRating: number | null;
  averageRating: number | null;
}

export interface MovieListResponseDto {
  posterPath: string;
  overview: string;
  releaseDate: string;
  id: number;
  title: string;
  userRating: number | null;
  isFavourite: boolean;
  averageRating: number | null;
}

export interface PaginatedMovieListResponseDto {
  data: MovieListResponseDto[];
  page: number;
  hasNextPage: boolean;
  totalPages: number;
}

export interface MovieCastListResponseDto {
  id: number;
  name: string;
  character: string;
  profilePath: string;
}

export interface PlotQuestionResponseDto {
  answer: string;
}
