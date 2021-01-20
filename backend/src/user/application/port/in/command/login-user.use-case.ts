import { User } from '../../../../domain/models/user.domain-model';

export interface LoginUserUseCase {
  login(command: LoginUserCommand): Promise<{ user: User; token: string }>;
}

export const LOGIN_USER_USE_CASE = Symbol('LOGIN_USER_USE_CASE');

export class LoginUserCommand {
  constructor(readonly username: string, readonly password: string) {}
}
