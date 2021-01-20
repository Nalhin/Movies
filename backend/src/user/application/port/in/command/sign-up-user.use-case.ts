import { User } from '../../../../domain/models/user.domain-model';

export interface SignUpUserUseCase {
  signUp(command: SignUpUserCommand): Promise<{ user: User; token: string }>;
}

export const SIGN_UP_USER_USE_CASE = Symbol('SIGN_UP_USER_USE_CASE');

export class SignUpUserCommand {
  constructor(
    readonly username: string,
    readonly email: string,
    readonly password: string,
  ) {}
}
