class AuthStorageMockService {
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

export const authStorageMock = new AuthStorageMockService();
