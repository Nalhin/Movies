import { mocked } from 'ts-jest/utils';
import { UserResponseDto } from '../../../../core/api/api.types';
import { AxiosResponse } from 'axios';
import { act, renderHook } from '@testing-library/react-hooks';
import { useAuthState } from './use-auth-state';
import { AnonymousUser, AuthenticatedUser } from '../../../models/user/user';
import { userResponseFactory } from '../../../../../test/factory/api/auth.factory';
import { getMe } from '../../../../core/api/user/user.api';
import { AuthStorageService } from '../../../services/storage/auth-storage.service';
import { MockedObject } from 'ts-jest/dist/utils/testing';

jest.mock('../../../../core/api/user/user.api');

describe('useAuthState', () => {
  const authStorage = {
    getAuthToken: jest.fn(),
    setAuthToken: jest.fn(),
    removeAuthToken: jest.fn(),
  } as MockedObject<AuthStorageService>;

  afterEach(() => {
    jest.clearAllMocks();
  });

  const user = userResponseFactory.buildOne();

  it('should fetch user and set user as response when token is present', async () => {
    mocked(getMe).mockResolvedValueOnce({
      data: user,
    } as AxiosResponse<UserResponseDto>);
    authStorage.getAuthToken.mockResolvedValueOnce('token');

    const { result, waitFor } = renderHook(() =>
      useAuthState(authStorage, new AnonymousUser()),
    );

    await waitFor(() => {
      expect(authStorage.getAuthToken).toHaveBeenCalledTimes(1);
      expect(getMe).toHaveBeenCalledTimes(1);
    });
    expect(result.current.user.isAuthenticated).toBeTruthy();
    expect(result.current.isLoading).toBeFalsy();
  });

  it('should remove token when request is not successful', async () => {
    mocked(getMe).mockRejectedValueOnce({});
    authStorage.getAuthToken.mockResolvedValueOnce('token');
    authStorage.removeAuthToken.mockResolvedValueOnce();

    const { result, waitFor } = renderHook(() =>
      useAuthState(authStorage, new AnonymousUser()),
    );

    await waitFor(() => {
      expect(authStorage.removeAuthToken).toHaveBeenCalledTimes(1);

      expect(getMe).toHaveBeenCalledTimes(1);
    });
    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.user.isAuthenticated).toBeFalsy();
  });

  it('should set loading to false when token is falsy', async () => {
    authStorage.getAuthToken.mockResolvedValueOnce('');

    const { result, waitForNextUpdate } = renderHook(() =>
      useAuthState(authStorage, new AnonymousUser()),
    );
    await waitForNextUpdate();

    expect(authStorage.getAuthToken).toHaveBeenCalledTimes(1);
    expect(result.current.isLoading).toBeFalsy();
  });

  it('should logout current user and remove auth cookie', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useAuthState(authStorage, new AuthenticatedUser(user)),
    );

    act(() => {
      result.current.logoutUser();
    });
    await waitForNextUpdate();

    expect(authStorage.removeAuthToken).toHaveBeenCalledTimes(1);
    expect(result.current.user.isAuthenticated).toBeFalsy();
  });

  it('should authenticate current user', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useAuthState(authStorage, new AuthenticatedUser(user)),
    );

    act(() => {
      result.current.authenticateUser({ user, token: 'token' });
    });
    await waitForNextUpdate();

    expect(authStorage.setAuthToken).toHaveBeenCalledTimes(1);
    expect(result.current.user.isAuthenticated).toBeTruthy();
  });

  it('should call onAuth function after authentication', async () => {
    const onAuth = jest.fn();
    const { result, waitForNextUpdate } = renderHook(() =>
      useAuthState(authStorage, new AuthenticatedUser(user)),
    );

    act(() => {
      result.current.authenticateUser({ user, token: 'token' }, { onAuth });
    });
    await waitForNextUpdate();

    expect(onAuth).toHaveBeenCalledTimes(1);
    expect(onAuth).toHaveBeenCalledWith(user);
  });
});
