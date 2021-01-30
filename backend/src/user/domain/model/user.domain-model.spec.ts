import { User } from './user.domain-model';

describe('User domain model', () => {
  describe('hashPassword()', () => {
    it('should return user with hashed password', async () => {
      const user = new User(1, 'username', 'email', 'password');

      const actualResult = await user.hashPassword();

      expect(actualResult.password).not.toBe('password');
    });
  });

  describe('canLogin()', () => {
    it('should check if passwords are equal', async () => {
      const user = await new User(
        1,
        'username',
        'email',
        'password',
      ).hashPassword();

      const actualResult = await user.canLogin('password');

      expect(actualResult).toBeTrue();
    });
  });
});
