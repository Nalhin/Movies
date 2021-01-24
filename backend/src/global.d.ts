import 'jest-extended';

declare global {
  declare namespace jest {
    // noinspection JSUnusedGlobalSymbols
    interface Matchers<R> {
      toThrowSelfValidationErrorContainingAllFields(
        fields: string[],
      ): CustomMatcherResult<R>;

      toThrowSelfValidationError(): CustomMatcherResult<R>;
    }
  }
}
