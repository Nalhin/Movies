import { User } from '../../../../domain/models/user.domain-model';
import * as E from 'fp-ts/Either';

export interface LoginUserUseCase {
  login(
    command: LoginUserCommand,
  ): Promise<E.Either<LoginUserErrors, { user: User; token: string }>>;
}

export enum LoginUserErrors {
  InvalidCredentials = 'INVALID_CREDENTIALS',
}

export const LOGIN_USER_USE_CASE = Symbol('LOGIN_USER_USE_CASE');

export class LoginUserCommand {
  constructor(readonly username: string, readonly password: string) {}
}
