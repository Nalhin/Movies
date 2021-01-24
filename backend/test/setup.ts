import 'jest-extended';
import {
  toThrowSelfValidationError,
  toThrowSelfValidationErrorContainingAllFields,
} from './matchers/to-throw-self-validation-error.matcher';

expect.extend({
  toThrowSelfValidationErrorContainingAllFields,
  toThrowSelfValidationError,
});
