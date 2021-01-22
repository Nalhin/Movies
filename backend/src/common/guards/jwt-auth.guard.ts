import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { AUTH_OPTIONAL_KEY } from '../decorators/auth-optional.decorator';
import { AUTH_REQUIRED_KEY } from '../decorators/auth-required.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  handleRequest(err, user) {
    return user;
  }

  canActivate(context: ExecutionContext) {
    const isAuthOptional = this.reflector.getAllAndOverride<boolean>(
      AUTH_OPTIONAL_KEY,
      [context.getHandler(), context.getClass()],
    );

    const isAuthRequired = this.reflector.getAllAndOverride<boolean>(
      AUTH_REQUIRED_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!isAuthOptional && !isAuthRequired) {
      return true;
    }
    return super.canActivate(context);
  }
}
