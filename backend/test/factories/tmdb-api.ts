import { FactoryBuilder } from 'factory.io';
import { MovieDetailsResponseDto } from '../../src/movie/adapter/out/movie-data/tmdb-movie-data/dto/movie-details-response.dto';
import * as faker from 'faker';
import { MovieCastListResponseDto } from '../../src/movie/adapter/out/movie-data/tmdb-movie-data/dto/movie-cast-list-response.dto';
import { MovieItemResponse } from '../../src/movie/adapter/out/movie-data/tmdb-movie-data/dto/movie-list-response.dto';

export const tmdvMovieItemResponse = FactoryBuilder.of<MovieItemResponse>()
  .props({
    posterPath: null,
    adult: faker.random.boolean(),
    overview: () => faker.random.words(10),
    releaseDate: () => faker.date.soon().toDateString(),
    id: faker.random.number,
    originalTitle: faker.random.word,
    originalLanguage: faker.random.word,
    title: faker.random.word,
    backdropPath: faker.image.imageUrl,
    popularity: faker.random.number,
    voteCount: faker.random.number,
    video: faker.random.boolean,
    voteAverage: () => faker.random.number({ min: 1, max: 10 }),
  })
  .build();

export const tmdbMovieDetailsFactory = FactoryBuilder.of<MovieDetailsResponseDto>()
  .props({
    adult: faker.random.boolean(),
    backdropPath: faker.image.imageUrl,
    belongsToCollection: null,
    budget: faker.random.number,
    genres: [],
    homepage: null,
    id: faker.random.number,
    imdbId: () => `tt${faker.random.number()}`,
    originalLanguage: faker.random.word,
    originalTitle: faker.random.word,
    overview: () => faker.random.words(10),
    popularity: faker.random.number,
    posterPath: null,
    productionCompanies: [],
    productionCountries: [],
    releaseDate: () => faker.date.soon().toDateString(),
    revenue: faker.random.number,
    runtime: 120,
    spokenLanguages: [],
    status: faker.random.arrayElement([
      'Rumored',
      'Planned',
      'Released',
      'Canceled',
      'In Production',
      'Post Production',
    ]),
    tagline: null,
    title: faker.random.word,
    video: faker.random.boolean,
    voteAverage: () => faker.random.number({ min: 1, max: 10 }),
    voteCount: faker.random.number,
  })
  .build();

export const tmbdMovieCastListFactory = FactoryBuilder.of<MovieCastListResponseDto>()
  .props({
    adult: faker.random.boolean,
    gender: null,
    id: faker.random.number,
    knownForDepartment: faker.random.word,
    name: faker.random.word,
    originalName: faker.random.word,
    popularity: faker.random.number,
    profilePath: faker.image.imageUrl,
    castId: faker.random.number,
    character: faker.random.words,
    creditId: faker.random.uuid,
    order: faker.random.number,
  })
  .build();
