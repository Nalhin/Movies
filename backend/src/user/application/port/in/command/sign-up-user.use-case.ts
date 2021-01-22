import { User } from '../../../../domain/models/user.domain-model';
import * as E from 'fp-ts/Either';

export interface SignUpUserUseCase {
  signUp(
    command: SignUpUserCommand,
  ): Promise<E.Either<SignUpUserErrors, { user: User; token: string }>>;
}

export enum SignUpUserErrors {
  UsernameOrEmailTaken = 'UsernameOrEmailTaken',
}

export const SIGN_UP_USER_USE_CASE = Symbol('SIGN_UP_USER_USE_CASE');

export class SignUpUserCommand {
  constructor(
    readonly username: string,
    readonly email: string,
    readonly password: string,
  ) {}
}
