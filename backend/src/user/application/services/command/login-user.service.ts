import {
  LoginUserCommand,
  LoginUserErrors,
  LoginUserUseCase,
} from '../../port/in/command/login-user.use-case';
import { Injectable } from '@nestjs/common';
import { User } from '../../../domain/models/user.domain-model';
import {
  GET_USER_BY_USERNAME_PORT,
  GetUserByUsernamePort,
} from '../../port/out/query/get-user-by-username.port';
import {
  TOKEN_PROVIDER_PORT,
  TokenProviderPort,
} from '../../port/out/query/token-provider.port';
import { Inject } from '@nestjs/common/decorators/core';
import * as E from 'fp-ts/Either';
import * as O from 'fp-ts/Option';

@Injectable()
export class LoginUserService implements LoginUserUseCase {
  constructor(
    @Inject(GET_USER_BY_USERNAME_PORT)
    private readonly getUserByUsernamePort: GetUserByUsernamePort,
    @Inject(TOKEN_PROVIDER_PORT)
    private readonly tokenProvider: TokenProviderPort,
  ) {}

  public async login(
    command: LoginUserCommand,
  ): Promise<E.Either<LoginUserErrors, { user: User; token: string }>> {
    const user = await this.getUserByUsernamePort.getByUsername(
      command.username,
    );

    if (O.isNone(user)) {
      return E.left(LoginUserErrors.InvalidCredentials);
    }

    const presentUser = user.value;
    if (await presentUser.canLogin(command.password)) {
      return E.left(LoginUserErrors.InvalidCredentials);
    }

    return E.right({
      user: presentUser,
      token: this.tokenProvider.signToken(presentUser.id, presentUser.username),
    });
  }
}
