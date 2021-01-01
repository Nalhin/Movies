import React from 'react';
import Home from './home';
import { render } from '@testing-library/react-native';

describe('Home page', () => {
  it('should display text', () => {
    const { getByText } = render(<Home />);

    expect(getByText(/home/i)).toBeTruthy();
    expect([]).toBeArrayOfSize(0);
  });
});
