import '@testing-library/jest-native/extend-expect';
import 'react-native-gesture-handler/jestSetup';
import 'jest-extended';

import { setLogger } from 'react-query';

setLogger({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  log: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  warn: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  error: () => {},
});

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

jest.mock('react-native-reanimated', () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const Reanimated = require('react-native-reanimated/mock');

  // The mock for `call` immediately calls the callback which is incorrect
  // So we override it with a no-op
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  Reanimated.default.call = () => {};

  return Reanimated;
});

jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');
