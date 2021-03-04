import { setupServer } from 'msw/node';
import {
  movieListResponseFactory,
  paginatedMovieListResponse,
} from '../../../../test/factory/api/movie.factory';
import { renderWithNavigation } from '../../../../test/render/render-with-providers';
import PopularMovies from './popular-movies';
import React from 'react';
import { waitFor } from '@testing-library/react-native';
import { getPopularMoviesPageApiMock } from '../../../../test/mocks/api/movie/movie.mock';

describe('PopularMovies Page', () => {
  const server = setupServer();

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('should display popular movies', async () => {
    const movies = movieListResponseFactory.buildMany(4, {
      partial: { title: 'title' },
    });
    server.use(
      getPopularMoviesPageApiMock(
        paginatedMovieListResponse.buildOne({ data: movies }),
      ),
    );
    const { getAllByText } = renderWithNavigation(<PopularMovies />);

    await waitFor(() => {
      expect(getAllByText(/title/i)).toHaveLength(4);
    });
  });
});
