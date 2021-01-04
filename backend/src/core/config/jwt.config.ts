import { ConfigType, registerAs } from '@nestjs/config';

export const jwtConfig = registerAs('jwt', () => ({
  secret: process.env.JWT_SECRET || 'secret',
  expiresIn: process.env.JWT_EXPIRES_IN || 60 * 60 * 1000,
}));

export type JwtConfig = ConfigType<typeof jwtConfig>;
