import { setupServer } from 'msw/node';
import {
  movieListResponseFactory,
  paginatedMovieListResponse,
} from '../../../../test/factory/api/movie.factory';
import { renderWithProviders } from '../../../../test/render/render-with-providers';
import { waitFor } from '@testing-library/react-native';
import React from 'react';
import RatedMovies from './rated-movies';
import { getRatedMoviesPageApiMock } from '../../../../test/mocks/api/movie-rating.mock';

describe('RatedMovies Page', () => {
  const server = setupServer();

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('should display popular movies', async () => {
    const movies = movieListResponseFactory.buildMany(4, {
      partial: { title: 'title', userRating: 5 },
    });
    server.use(
      getRatedMoviesPageApiMock(
        paginatedMovieListResponse.buildOne({ data: movies }),
      ),
    );
    const { getAllByText } = renderWithProviders(<RatedMovies />);

    await waitFor(() => {
      expect(getAllByText(/title/i)).toHaveLength(4);
    });
  });
});
