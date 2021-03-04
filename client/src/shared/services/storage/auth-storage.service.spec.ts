import { AuthStorageService } from './auth-storage.service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { mocked } from 'ts-jest/utils';

jest.mock('@react-native-async-storage/async-storage');

describe('AuthStorageService', () => {
  describe('getAuthToken()', () => {
    it('should return token from storage', async () => {
      mocked(AsyncStorage).getItem.mockResolvedValueOnce('value');
      const service = new AuthStorageService();

      const result = await service.getAuthToken();

      expect(result).toEqual('value');
    });

    it('should cache token', async () => {
      mocked(AsyncStorage).getItem.mockResolvedValueOnce('value');
      const service = new AuthStorageService();

      expect(await service.getAuthToken()).toEqual('value');
      expect(await service.getAuthToken()).toEqual('value');
    });
  });

  describe('setAuthToken()', () => {
    it('should set token', () => {
      const service = new AuthStorageService();

      service.setAuthToken('token');

      expect(mocked(AsyncStorage).setItem).toBeCalledWith(
        expect.any(String),
        'token',
      );
    });
    it('should invalidate cache', async () => {
      mocked(AsyncStorage).getItem.mockResolvedValueOnce('invalid');
      const service = new AuthStorageService();

      await service.getAuthToken();
      await service.setAuthToken('token');

      expect(await service.getAuthToken()).toBe('token');
    });
  });

  describe('removeAuthToken()', () => {
    it('should set token', () => {
      const service = new AuthStorageService();

      service.removeAuthToken();

      expect(mocked(AsyncStorage).setItem).toBeCalledWith(
        expect.any(String),
        'token',
      );
    });
  });
});
