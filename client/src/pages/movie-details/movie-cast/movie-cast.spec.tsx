import { setupServer } from 'msw/node';
import { movieCastListResponseFactory } from '../../../../test/factory/api/movie.factory';
import { renderWithBaseProviders } from '../../../../test/render/render-with-providers';
import { waitFor } from '@testing-library/react-native';
import React from 'react';
import { getMovieCastApiMock } from '../../../../test/mocks/api/movie/movie-cast.mock';
import MovieCast from './movie-cast';

describe('MovieCast component', () => {
  const server = setupServer();

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('should display cast members', async () => {
    const cast = movieCastListResponseFactory.buildMany(4, {
      partial: { name: 'Samuel L. Jackson' },
    });
    server.use(getMovieCastApiMock(cast));
    const { getAllByText } = renderWithBaseProviders(<MovieCast movieId={1} />);

    await waitFor(() => {
      expect(getAllByText(/Samuel L. Jackson/i)).toHaveLength(4);
    });
  });
});
