export interface TokenProviderPort {
  signToken(id: number, username: string): string;
}

export const TOKEN_PROVIDER_PORT = Symbol('TOKEN_PROVIDER_PORT');
