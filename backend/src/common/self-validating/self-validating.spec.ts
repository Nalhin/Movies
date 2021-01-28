import { SelfValidating } from './self-validating';
import { MinLength } from 'class-validator';

class TestClass extends SelfValidating {
  @MinLength(6)
  readonly name;

  constructor(name) {
    super();
    this.name = name;
    this.validate();
  }
}

describe('SelfValidating', () => {
  describe('validate()', () => {
    it('should throw error when class has invalid property', () => {
      expect(
        () => new TestClass('test'),
      ).toThrowSelfValidationErrorContainingAllFields(['name']);
    });
    it('should validate class properties', () => {
      expect(() => new TestClass('valid property')).not.toThrow();
    });
  });
});
