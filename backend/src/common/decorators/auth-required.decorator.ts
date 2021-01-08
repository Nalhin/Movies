import { SetMetadata } from '@nestjs/common';

export const AUTH_REQUIRED_KEY = 'AUTH_REQUIRED';

export const AuthRequired = () => SetMetadata(AUTH_REQUIRED_KEY, true);
