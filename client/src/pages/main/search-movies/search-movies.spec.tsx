import { setupServer } from 'msw/node';
import {
  movieListResponseFactory,
  paginatedMovieListResponse,
} from '../../../../test/factory/api/movie.factory';
import { renderWithNavigation } from '../../../../test/render/render-with-providers';
import { fireEvent, waitFor } from '@testing-library/react-native';
import React from 'react';
import { getSearchMoviesPageApiMock } from '../../../../test/mocks/api/movie/movie.mock';
import SearchMovies from './search-movies';

describe('SearchMovies Page', () => {
  const server = setupServer();

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('should display popular movies', async () => {
    const movies = movieListResponseFactory.buildMany(4, {
      partial: { title: 'title' },
    });
    server.use(
      getSearchMoviesPageApiMock(
        paginatedMovieListResponse.buildOne({ data: movies }),
      ),
    );
    const {
      getAllByText,
      getByPlaceholderText,
      queryByTestId,
    } = renderWithNavigation(<SearchMovies />);

    fireEvent.changeText(getByPlaceholderText(/search/i), 'search');

    await waitFor(() => {
      expect(getAllByText(/title/i)).toHaveLength(4);
      expect(queryByTestId(/loader/i)).toBeNull();
    });
  });
});
