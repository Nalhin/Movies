import {
  LoginUserCommand,
  LoginUserUseCase,
} from '../../port/in/command/login-user.use-case';
import { Injectable, UnauthorizedException } from '@nestjs/common';
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
  ): Promise<{ user: User; token: string }> {
    const user = await this.getUserByUsernamePort.getByUsername(
      command.username,
    );

    if (!user || (await user.canLogin(command.password))) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    return {
      user,
      token: this.tokenProvider.signToken(user.id, user.username),
    };
  }
}
