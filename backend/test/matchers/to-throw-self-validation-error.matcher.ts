import { SelfValidationError } from '../../src/common/self-validating/self-validating';

export function toThrowSelfValidationErrorContainingAllFields(
  received,
  actual: string[],
) {
  try {
    received();
  } catch (e) {
    expect(e).toBeInstanceOf(SelfValidationError);
    expect(e.errors.map((e) => e.field)).toContainAllValues(actual);
    return { message: () => 'Successful', pass: true };
  }
  return { message: () => 'No error thrown', pass: false };
}

export function toThrowSelfValidationError(received) {
  try {
    received();
  } catch (e) {
    expect(e).toBeInstanceOf(SelfValidationError);
    return { message: () => 'Successful', pass: true };
  }
  return { message: () => 'No error thrown', pass: false };
}
