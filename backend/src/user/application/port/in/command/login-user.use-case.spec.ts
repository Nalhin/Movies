import { LoginUserCommand } from './login-user.use-case';

describe('LoginUserUseCase', () => {
  describe('LoginUserCommand', () => {
    it('should initialize command with valid fields', () => {
      const result = new LoginUserCommand('username', 'password');

      expect(result.password).toBe('password');
      expect(result.username).toBe('username');
    });
    it('should now allow a password shorter than 6 characters', () => {
      expect(() => {
        new LoginUserCommand('username', 'short');
      }).toThrowSelfValidationErrorContainingAllFields(['password']);
    });

    it('should not allow a password longer than 50 characters', () => {
      expect(
        () => new LoginUserCommand('username', 'long'.repeat(20)),
      ).toThrowSelfValidationErrorContainingAllFields(['password']);
    });

    it('should not allow username shorter than 6 characters', () => {
      expect(
        () => new LoginUserCommand('short', 'password'),
      ).toThrowSelfValidationErrorContainingAllFields(['username']);
    });

    it('should not allow username longer than 50 characters', () => {
      expect(
        () => new LoginUserCommand('long'.repeat(20), 'password'),
      ).toThrowSelfValidationErrorContainingAllFields(['username']);
    });
  });
});
