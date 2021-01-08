import { SetMetadata } from '@nestjs/common';

export const AUTH_OPTIONAL_KEY = 'AUTH_OPTIONAL';

export const AuthOptional = () => SetMetadata(AUTH_OPTIONAL_KEY, true);
