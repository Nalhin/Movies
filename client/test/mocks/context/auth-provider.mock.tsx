import React from 'react';
import { AnonymousUser } from '../../../src/shared/models/user/user';
import { UserContext } from '../../../src/shared/context/auth/use-user/use-user';
import { AuthContext } from '../../../src/shared/context/auth/use-auth/use-auth';
import { AuthProviderProps } from '../../../src/shared/context/auth/auth-provider/auth-provider';

interface Props extends AuthProviderProps {
  authenticateUser: () => Promise<void>;
  logoutUser: () => void;
}

export const AuthProviderMock: React.FC<Props> = ({
  children,
  defaultUser = new AnonymousUser(),
  authenticateUser,
  logoutUser,
}) => {
  return (
    <UserContext.Provider value={{ user: defaultUser }}>
      <AuthContext.Provider value={{ authenticateUser, logoutUser }}>
        {children}
      </AuthContext.Provider>
    </UserContext.Provider>
  );
};
