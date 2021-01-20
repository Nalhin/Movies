import {
  SignUpUserCommand,
  SignUpUserUseCase,
} from '../../port/in/command/sign-up-user.use-case';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { User } from '../../../domain/models/user.domain-model';
import {
  SAVE_USER_PORT,
  SaveUserPort,
} from '../../port/out/command/save-user.port';
import { ExistsByUsernameOrEmailPort } from '../../port/out/query/exists-by-username-or-email.port';
import { Inject } from '@nestjs/common/decorators/core';
import {
  TOKEN_PROVIDER_PORT,
  TokenProviderPort,
} from '../../port/out/query/token-provider.port';

@Injectable()
export class SignUpUserService implements SignUpUserUseCase {
  constructor(
    @Inject(SAVE_USER_PORT)
    private readonly saveUserProvider: SaveUserPort,
    @Inject(TOKEN_PROVIDER_PORT)
    private readonly existsProvider: ExistsByUsernameOrEmailPort,
    @Inject(TOKEN_PROVIDER_PORT)
    private readonly tokenProvider: TokenProviderPort,
  ) {}

  public async signUp(
    command: SignUpUserCommand,
  ): Promise<{ user: User; token: string }> {
    if (
      await this.existsProvider.existsByUsernameOrEmail(
        command.email,
        command.username,
      )
    ) {
      throw new UnprocessableEntityException('Username or email taken');
    }
    const user = new User(
      null,
      command.username,
      command.email,
      command.password,
    );
    const savedUser = await this.saveUserProvider.save(
      await user.hashPassword(),
    );
    return {
      user: savedUser,
      token: this.tokenProvider.signToken(savedUser.id, savedUser.username),
    };
  }
}
