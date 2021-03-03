import AsyncStorage from '@react-native-async-storage/async-storage';

const AUTH_TOKEN = '@auth_token';

export class AuthStorageService implements AuthStorage {
  private token: string | null = null;

  async getAuthToken(): Promise<string | null> {
    if (this.token) {
      return this.token;
    }
    this.token = await AsyncStorage.getItem(AUTH_TOKEN);
    return this.token;
  }

  async setAuthToken(token: string): Promise<void> {
    this.token = token;
    await AsyncStorage.setItem(AUTH_TOKEN, token);
  }

  async removeAuthToken(): Promise<void> {
    this.token = null;
    await AsyncStorage.removeItem(AUTH_TOKEN);
  }
}

export interface AuthStorage {
  getAuthToken(): Promise<string | null>;

  setAuthToken(token: string): Promise<void>;

  removeAuthToken(): Promise<void>;
}

export const authStorage = new AuthStorageService();
