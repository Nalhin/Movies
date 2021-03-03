import { applyDecorators, SetMetadata } from '@nestjs/common';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';

export const AUTH_REQUIRED_KEY = 'AUTH_REQUIRED';

export const AuthRequired = () =>
  applyDecorators(
    SetMetadata(AUTH_REQUIRED_KEY, true),
    ApiBearerAuth(),
    ApiUnauthorizedResponse({ description: 'Unauthorized access' }),
  );
