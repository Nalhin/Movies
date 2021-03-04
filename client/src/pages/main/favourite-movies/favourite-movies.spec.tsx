import { setupServer } from 'msw/node';
import {
  movieListResponseFactory,
  paginatedMovieListResponse,
} from '../../../../test/factory/api/movie.factory';
import { renderWithProviders } from '../../../../test/render/render-with-providers';
import { waitFor } from '@testing-library/react-native';
import React from 'react';
import FavouriteMovies from './favourite-movies';
import { getFavouriteMoviesPageApiMock } from '../../../../test/mocks/api/movie-favourite.mock';

describe('FavouriteMovies Page', () => {
  const server = setupServer();

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('should display popular movies', async () => {
    const movies = movieListResponseFactory.buildMany(4, {
      partial: { title: 'title', isFavourite: true },
    });
    server.use(
      getFavouriteMoviesPageApiMock(
        paginatedMovieListResponse.buildOne({ data: movies }),
      ),
    );
    const { getAllByText } = renderWithProviders(<FavouriteMovies />);

    await waitFor(() => {
      expect(getAllByText(/title/i)).toHaveLength(4);
    });
  });
});
