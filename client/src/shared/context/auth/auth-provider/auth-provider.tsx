import React from 'react';
import { AnonymousUser, AuthenticatedUser } from '../../../models/user/user';
import { useAuthState } from '../use-auth-state/use-auth-state';
import { AuthContext } from '../use-auth/use-auth';
import { UserContext } from '../use-user/use-user';
import { AuthStorage } from '../../../services/storage/auth-storage.service';

export interface AuthProviderProps {
  defaultUser?: AnonymousUser | AuthenticatedUser;
  authStorage: AuthStorage;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({
  authStorage,
  children,
  defaultUser = new AnonymousUser(),
}) => {
  const { isLoading, user, authenticateUser, logoutUser } = useAuthState(
    authStorage,
    defaultUser,
  );

  return (
    <UserContext.Provider value={{ user }}>
      <AuthContext.Provider value={{ authenticateUser, logoutUser }}>
        {!isLoading ? children : null}
      </AuthContext.Provider>
    </UserContext.Provider>
  );
};
