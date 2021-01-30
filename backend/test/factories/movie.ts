import { FactoryBuilder } from 'factory.io';
import { Movie } from '../../src/movie/domain/model/movie.domain-model';
import * as faker from 'faker';

export const movieFactory = FactoryBuilder.of(Movie)
  .props({
    id: faker.random.number({ min: 1 }),
    imdbId: faker.random.uuid,
    title: faker.commerce.productName,
    userRating: faker.random.number({ min: 1, max: 10 }),
    isFavourite: false,
  })
  .build();
