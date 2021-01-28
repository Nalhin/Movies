import { FactoryBuilder } from 'factory.io';
import { MovieDetailsResponseDto } from '../../src/movie/adapter/out/http/tmdb-movie/dto/movie-details-response.dto';
import * as faker from 'faker';

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
