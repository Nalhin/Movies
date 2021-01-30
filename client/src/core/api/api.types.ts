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
  adult: boolean;
  backdropPath: string;
  budget: number;
  id: number;
  imdbId: string;
  originalLanguage: string;
  originalTitle: string;
  overview: string;
  popularity: number;
  posterPath: string | null;
  releaseDate: string;
  revenue: number;
  runtime: number | null;
  tagline: string | null;
  title: string;
  video: boolean;
  isFavourite: boolean;
  userRating: number | null;
  averageRating: number | null;
  voteAverage: number;
  voteCount: number;
}

export interface MovieListResponseDto {
  posterPath: string;
  adult: boolean;
  overview: string;
  releaseDate: string;
  id: number;
  originalTitle: string;
  originalLanguage: string;
  title: string;
  backdropPath: string;
  popularity: number;
  voteCount: number;
  userRating: number | null;
  isFavourite: boolean;
  averageRating: number | null;
}

export interface PaginatedMovieListResponseDto {
  data: MovieListResponseDto;
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
