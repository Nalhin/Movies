import React from 'react';
import { AnonymousUser, AuthenticatedUser } from '../../../models/user/user';
import { useAuthState } from '../use-auth-state/use-auth-state';
import { AuthContext } from '../use-auth/use-auth';
import { UserContext } from '../use-user/use-user';
import { AuthStorageService } from '../../../service/storage/auth-storage.service';

interface Props {
  defaultUser?: AnonymousUser | AuthenticatedUser;
  authStorage: AuthStorageService;
}

export const AuthProvider: React.FC<Props> = ({
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
