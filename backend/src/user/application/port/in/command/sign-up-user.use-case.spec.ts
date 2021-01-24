import { SignUpUserCommand } from './sign-up-user.use-case';

describe('SignUpUserUseCase', () => {
  describe('SignUpUserCommand', () => {
    it('should initialize command with valid fields', () => {
      const command = new SignUpUserCommand(
        'username',
        'email@gmail.com',
        'password',
      );

      expect(command.password).toBe('password');
      expect(command.username).toBe('username');
      expect(command.email).toBe('email@gmail.com');
    });

    it('should now allow a password shorter than 6 characters', () => {
      expect(() => {
        new SignUpUserCommand('username', 'email@gmail.com', 'short');
      }).toThrowSelfValidationErrorContainingAllFields(['password']);
    });

    it('should not allow a password longer than 50 characters', () => {
      expect(
        () =>
          new SignUpUserCommand(
            'username',
            'email@gmail.com',
            'long'.repeat(20),
          ),
      ).toThrowSelfValidationErrorContainingAllFields(['password']);
    });

    it('should not allow username shorter than 6 characters', () => {
      expect(
        () => new SignUpUserCommand('short', 'email@gmail.com', 'password'),
      ).toThrowSelfValidationErrorContainingAllFields(['username']);
    });

    it('should not allow username longer than 50 characters', () => {
      expect(
        () =>
          new SignUpUserCommand(
            'long'.repeat(20),
            'email@gmail.com',
            'password',
          ),
      ).toThrowSelfValidationErrorContainingAllFields(['username']);
    });

    it('should not allow to enter invalid email', () => {
      expect(
        () => new SignUpUserCommand('username', 'email', 'password'),
      ).toThrowSelfValidationErrorContainingAllFields(['email']);
    });
  });
});
