import { setupServer } from 'msw/node';
import { renderWithBaseProviders } from '../../../../test/render/render-with-providers';
import PlotQuestionModal from './plot-question-modal';
import React from 'react';
import { getPlotQuestionApiMock } from '../../../../test/mocks/api/movie/movie-plot-question.mock';
import { fireEvent, waitFor } from '@testing-library/react-native';

describe('PlotQuestionModal component', () => {
  const server = setupServer();

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('should ask a question and display answer', async () => {
    server.use(getPlotQuestionApiMock({ answer: 'His father' }));

    const { getByText, getByTestId, getByRole } = renderWithBaseProviders(
      <PlotQuestionModal movieId={1} isOpen onClose={jest.fn()} />,
    );

    fireEvent.changeText(getByTestId('ask-question-text'), 'query');
    fireEvent.press(getByRole('button'));

    await waitFor(() => {
      expect(getByText(/his father/i)).toBeTruthy();
    });
  });
});
