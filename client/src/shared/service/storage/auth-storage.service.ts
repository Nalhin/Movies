import AsyncStorage from '@react-native-async-storage/async-storage';

export class AuthStorageService {
  private token: string | null = null;

  async getAuthToken(): Promise<string | null> {
    if (this.token) {
      return this.token;
    }
    this.token = await AsyncStorage.getItem('@auth_token');
    return this.token;
  }

  async setAuthToken(token: string): Promise<void> {
    this.token = token;
    await AsyncStorage.setItem('@auth_token', token);
  }

  async removeAuthToken(): Promise<void> {
    this.token = null;
    await AsyncStorage.removeItem('@auth_token');
  }
}

export const authStorage = new AuthStorageService();
