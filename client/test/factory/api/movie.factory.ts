import { FactoryBuilder } from 'factory.io';
import {
  MovieCastListResponseDto,
  MovieDetailsResponseDto,
  MovieListResponseDto,
  PaginatedMovieListResponseDto,
} from '../../../src/core/api/api.types';
import * as faker from 'faker';

export const movieListResponseFactory = FactoryBuilder.of<MovieListResponseDto>()
  .props({
    posterPath: faker.internet.url,
    overview: () => faker.random.words(10),
    releaseDate: faker.date.soon().toDateString(),
    id: faker.random.number,
    title: faker.random.word,
    userRating: () => faker.random.number({ min: 1, max: 10 }),
    isFavourite: faker.random.boolean,
    averageRating: () => faker.random.number({ min: 1, max: 10 }),
  })
  .build();

export const movieDetailsResponseFactory = FactoryBuilder.of<MovieDetailsResponseDto>()
  .props({
    budget: faker.random.number,
    imdbId: faker.random.word,
    revenue: faker.random.number,
    runtime: faker.random.number,
  })
  .mixins([movieListResponseFactory])
  .build();

export const movieCastListResponseFactory = FactoryBuilder.of<MovieCastListResponseDto>()
  .props({
    id: faker.random.number,
    name: faker.name.firstName,
    character: faker.random.word,
    profilePath: faker.internet.url,
  })
  .build();

export const paginatedMovieListResponse = FactoryBuilder.of<PaginatedMovieListResponseDto>()
  .props({
    data: [],
    page: 1,
    hasNextPage: false,
    totalPages: 1,
  })
  .build();
