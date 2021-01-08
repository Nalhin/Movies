import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { AUTH_OPTIONAL_KEY } from '../decorators/auth-optional.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isAuthOptional = this.reflector.getAllAndOverride<boolean>(
      AUTH_OPTIONAL_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!isAuthOptional) {
      return true;
    }
    return super.canActivate(context);
  }
}
