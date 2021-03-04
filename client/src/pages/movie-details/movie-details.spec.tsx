import { renderWithNavigation } from '../../../test/render/render-with-providers';
import MovieDetails from './movie-details';
import React from 'react';
import { setupServer } from 'msw/node';
import { getMovieDetailsApiMock } from '../../../test/mocks/api/movie/movie.mock';
import { movieDetailsResponseFactory } from '../../../test/factory/api/movie.factory';
import { waitFor } from '@testing-library/react-native';
import PlotQuestionModal from './plot-question-modal/plot-question-modal';
import { mocked } from 'ts-jest/utils';
import { View } from 'react-native';
import SimilarMovies from './similar-movies/similar-movies';
import MovieCast from './movie-cast/movie-cast';

jest.mock('./plot-question-modal/plot-question-modal');
mocked(PlotQuestionModal).mockReturnValue(<View />);
jest.mock('./similar-movies/similar-movies');
mocked(SimilarMovies).mockReturnValue(<View />);
jest.mock('./movie-cast/movie-cast');
mocked(MovieCast).mockReturnValue(<View />);

describe('MovieDetails', () => {
  const server = setupServer();

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('should display movie details', async () => {
    const movieDetails = movieDetailsResponseFactory.buildOne();
    server.use(getMovieDetailsApiMock(movieDetails, movieDetails.id));
    const { getByText } = renderWithNavigation(<MovieDetails />, {
      routeParams: { movieId: movieDetails.id },
    });

    await waitFor(() => {
      expect(getByText(new RegExp(movieDetails.title))).toBeTruthy();
      expect(getByText(movieDetails.overview)).toBeTruthy();
    });
  });
});
