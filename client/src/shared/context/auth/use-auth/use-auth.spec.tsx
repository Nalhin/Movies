import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { useAuth } from './use-auth';
import { AuthProvider } from '../auth-provider/auth-provider';
import { useAuthState } from '../use-auth-state/use-auth-state';
import { mocked } from 'ts-jest/utils';
import { AuthStorageService } from '../../../service/storage/auth-storage.service';

jest.mock('../use-auth-state/use-auth-state');

describe('useAuth', () => {
  it('should throw exception when not used within auth context', () => {
    const { result } = renderHook(() => useAuth());

    expect(result.error).toBeTruthy();
  });

  it('should return auth context state', () => {
    const expectedReturn = {
      authenticateUser: jest.fn(),
      logoutUser: jest.fn(),
    };
    mocked(useAuthState).mockReturnValue(
      (expectedReturn as unknown) as ReturnType<typeof useAuthState>,
    );

    const { result } = renderHook(() => useAuth(), {
      wrapper: ({ children }) => (
        <AuthProvider authStorage={new AuthStorageService()}>
          {children}
        </AuthProvider>
      ),
    });

    expect(result.current).toStrictEqual(expectedReturn);
  });
});
