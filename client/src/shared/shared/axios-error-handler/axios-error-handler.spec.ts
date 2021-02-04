import type { AxiosError } from 'axios';
import { axiosErrorHandler } from './axios-error-handler';

describe('onAxiosError function', () => {
  it('should call function with the correct status mapping', () => {
    const error = { response: { status: 400 } };
    const actions = {
      400: jest.fn(),
      '*': jest.fn(),
    };

    axiosErrorHandler(error as AxiosError, actions);

    expect(actions['*']).toHaveBeenCalledTimes(0);
    expect(actions['400']).toHaveBeenCalledTimes(1);
  });
  it('should call function mapped to * when status is not matched', () => {
    const error = { response: { status: 500 } };
    const actions = {
      400: jest.fn(),
      '*': jest.fn(),
    };

    axiosErrorHandler(error as AxiosError, actions);

    expect(actions['*']).toHaveBeenCalledTimes(1);
    expect(actions['400']).toHaveBeenCalledTimes(0);
  });
});
