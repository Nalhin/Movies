import { Reflector } from '@nestjs/core';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AUTH_REQUIRED_KEY } from '../decorators/auth-required.decorator';

@Injectable()
export class RequireAuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext) {
    const isAuthRequired = this.reflector.getAllAndOverride<boolean>(
      AUTH_REQUIRED_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!isAuthRequired) {
      return true;
    }
    return !!context.switchToHttp().getRequest().user;
  }
}
