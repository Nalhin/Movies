import { setupServer } from 'msw/node';
import { movieListResponseFactory } from '../../../../test/factory/api/movie.factory';
import { renderWithBaseProviders } from '../../../../test/render/render-with-providers';
import { waitFor } from '@testing-library/react-native';
import React from 'react';
import { getSimilarMoviesApiMock } from '../../../../test/mocks/api/movie.mock';
import SimilarMovies from './similar-movies';

describe('SimilarMovies component', () => {
  const server = setupServer();

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('should display cast members', async () => {
    const similarMovies = movieListResponseFactory.buildMany(4, {
      partial: { title: 'title' },
    });
    server.use(getSimilarMoviesApiMock(similarMovies, 1));
    const { getAllByText } = renderWithBaseProviders(
      <SimilarMovies movieId={1} onMoviePress={jest.fn()} />,
    );

    await waitFor(() => {
      expect(getAllByText(/title/i)).toHaveLength(4);
    });
  });

  it('should display information that no similar movies are found', async () => {
    server.use(getSimilarMoviesApiMock([], 1));
    const { getByText } = renderWithBaseProviders(
      <SimilarMovies movieId={1} onMoviePress={jest.fn()} />,
    );

    await waitFor(() => {
      expect(getByText(/no similar/i)).toBeTruthy();
    });
  });
});
