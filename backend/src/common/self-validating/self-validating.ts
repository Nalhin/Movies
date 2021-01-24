import { validateSync } from 'class-validator';
import { ValidationError } from 'class-validator/types/validation/ValidationError';

export abstract class SelfValidating {
  protected validate() {
    const errors = validateSync(this, { validationError: { target: false } });

    if (errors.length > 0) {
      throw SelfValidationError.fromValidationError(errors);
    }
  }
}

export class SelfValidationError extends Error {
  readonly errors: { field: string; messages: string[] }[];

  private constructor(errors: { field: string; messages: string[] }[]) {
    super('Validation failed');
    this.errors = errors;
  }

  private static parseValidationErrors(errors: ValidationError[]) {
    return errors.map((error) => ({
      field: error.property,
      messages: Object.values(error.constraints),
    }));
  }

  static fromValidationError(errors: ValidationError[]) {
    return new SelfValidationError(
      SelfValidationError.parseValidationErrors(errors),
    );
  }
}
