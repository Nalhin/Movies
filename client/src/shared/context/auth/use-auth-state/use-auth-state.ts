import {
  AnonymousUser,
  AuthenticatedUser,
  User,
  UserProperties,
} from '../../../models/user/user';
import React from 'react';
import { AuthStorage } from '../../../services/storage/auth-storage.service';
import { getMe } from '../../../../core/api/user/user.api';

export const useAuthState = (authStorage: AuthStorage, defaultUser: User) => {
  const [currUser, setCurrUser] = React.useState<User>(defaultUser);
  const [isLoading, setIsLoading] = React.useState(true);

  const authenticateUser = React.useCallback(
    async (
      { user, token }: { user: UserProperties; token: string },
      options: { onAuth?: (user: User) => void } = {},
    ) => {
      await authStorage.setAuthToken(token);
      const authUser = new AuthenticatedUser(user);
      setCurrUser(authUser);
      options.onAuth?.(authUser);
    },
    [],
  );

  const logoutUser = React.useCallback(async () => {
    await authStorage.removeAuthToken();
    setCurrUser(new AnonymousUser());
  }, []);

  React.useEffect(() => {
    (async () => {
      const token = await authStorage.getAuthToken();
      if (token) {
        try {
          const resp = await getMe();
          setCurrUser(new AuthenticatedUser(resp.data));
        } catch (e) {
          await authStorage.removeAuthToken();
        }
      }
      setIsLoading(false);
    })();
  }, []);

  return { authenticateUser, user: currUser, logoutUser, isLoading };
};
