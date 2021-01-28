import { AnonymousUser, AuthenticatedUser } from './app-user.model';

describe('AppUserModel', () => {
  describe('Anonymous user', () => {
    describe('isAuthenticated()', () => {
      it('should return false', () => {
        const user = new AnonymousUser();

        expect(user.isAuthenticated).toBeFalse();
      });
    });
  });
  describe('Authenticated user', () => {
    describe('isAuthenticated()', () => {
      it('should return true', () => {
        const user = new AuthenticatedUser('username', 1);

        expect(user.isAuthenticated).toBeTrue();
      });
    });
  });
});
