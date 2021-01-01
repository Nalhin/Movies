import { SetMetadata } from '@nestjs/common';

export const AUTH_REQUIRED_KEY = 'authRequired';

export const AuthRequired = () => SetMetadata(AUTH_REQUIRED_KEY, true);
