import { renderWithBaseProviders } from '../../../../test/render/render-with-providers';
import MovieRating from './movie-rating';
import { authenticatedUserFactory } from '../../../../test/factory/user/user.factory';
import React from 'react';
import { AnonymousUser } from '../../../shared/models/user/user';

describe('MovieRating component', () => {
  it('should display user rating when authenticated', () => {
    const { getByText } = renderWithBaseProviders(
      <MovieRating rateMovie={jest.fn()} userRating={1} averageRating={1} />,
      { user: authenticatedUserFactory.buildOne() },
    );

    expect(getByText(/your rating/i)).toBeTruthy();
  });

  it('should hide user rating when not authenticated', () => {
    const { queryByText } = renderWithBaseProviders(
      <MovieRating rateMovie={jest.fn()} userRating={1} averageRating={1} />,
      { user: new AnonymousUser() },
    );

    expect(queryByText(/your rating/i)).toBeNull();
  });
});
