import { User } from '../../../../domain/model/user.domain-model';
import * as E from 'fp-ts/Either';
import { SelfValidating } from '../../../../../common/self-validating/self-validating';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export interface SignUpUserUseCase {
  signUp(
    command: SignUpUserCommand,
  ): Promise<E.Either<SignUpUserErrors, { user: User; token: string }>>;
}

export enum SignUpUserErrors {
  UsernameOrEmailTaken = 'UsernameOrEmailTaken',
}

export const SIGN_UP_USER_USE_CASE = Symbol('SIGN_UP_USER_USE_CASE');

export class SignUpUserCommand extends SelfValidating {
  @MinLength(2)
  @MaxLength(50)
  @IsString()
  readonly username: string;

  @MinLength(6)
  @MaxLength(50)
  @IsString()
  readonly password: string;

  @IsEmail()
  @MaxLength(255)
  @IsString()
  readonly email: string;

  constructor(username: string, email: string, password: string) {
    super();
    this.username = username;
    this.email = email;
    this.password = password;
    this.validate();
  }
}
