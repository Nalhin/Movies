import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { AUTH_REQUIRED_KEY } from '../decorators/auth-required.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isAuthRequired = this.reflector.getAllAndOverride<boolean>(
      AUTH_REQUIRED_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!isAuthRequired) {
      return true;
    }
    return super.canActivate(context);
  }
}
