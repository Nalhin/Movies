import { User } from '../../../../domain/models/user.domain-model';
import * as E from 'fp-ts/Either';
import { MaxLength, MinLength } from 'class-validator';
import { SelfValidating } from '../../../../../common/self-validating/self-validating';

export interface LoginUserUseCase {
  login(
    command: LoginUserCommand,
  ): Promise<E.Either<LoginUserErrors, { user: User; token: string }>>;
}

export enum LoginUserErrors {
  InvalidCredentials = 'INVALID_CREDENTIALS',
}

export const LOGIN_USER_USE_CASE = Symbol('LOGIN_USER_USE_CASE');

export class LoginUserCommand extends SelfValidating {
  @MinLength(2)
  @MaxLength(50)
  readonly username: string;

  @MinLength(6)
  @MaxLength(50)
  readonly password: string;

  constructor(username: string, password: string) {
    super();
    this.username = username;
    this.password = password;
    this.validate();
  }
}
