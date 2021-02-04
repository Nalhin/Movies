import { AuthStorage } from '../../../src/shared/services/storage/auth-storage.service';

export class AuthStorageMock implements AuthStorage {
  private token: string | null = null;

  async getAuthToken(): Promise<string | null> {
    return null;
  }

  async setAuthToken(token: string): Promise<void> {
    this.token = token;
  }

  async removeAuthToken(): Promise<void> {
    this.token = null;
  }
}
