import { renderWithBaseProviders } from '../../../../test/render/render-with-providers';
import MovieStats from './movie-stats';
import React from 'react';

describe('MovieStats component', () => {
  it('should display movie statistics', () => {
    const { getByText } = renderWithBaseProviders(
      <MovieStats
        budget={1_000_000}
        revenue={2_000_000}
        releaseDate="1998-02-05"
        runtime={120}
      />,
    );

    expect(getByText(/\$1,000,000/i));
    expect(getByText(/\$2,000,000/i));
    expect(getByText(/1998/));
    expect(getByText(/120 minutes/i));
  });
});
