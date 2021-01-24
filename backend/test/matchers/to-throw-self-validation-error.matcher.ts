import { SelfValidationError } from '../../dist/common/self-validating/self-validaiton.exception';

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
