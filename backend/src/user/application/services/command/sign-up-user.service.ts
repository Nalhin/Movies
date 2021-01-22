import {
  SignUpUserCommand,
  SignUpUserErrors,
  SignUpUserUseCase,
} from '../../port/in/command/sign-up-user.use-case';
import { Injectable } from '@nestjs/common';
import { User } from '../../../domain/models/user.domain-model';
import {
  SAVE_USER_PORT,
  SaveUserPort,
} from '../../port/out/command/save-user.port';
import {
  EXISTS_BY_USERNAME_OR_EMAIL_PORT,
  ExistsByUsernameOrEmailPort,
} from '../../port/out/query/exists-by-username-or-email.port';
import { Inject } from '@nestjs/common/decorators/core';
import {
  TOKEN_PROVIDER_PORT,
  TokenProviderPort,
} from '../../port/out/query/token-provider.port';
import * as E from 'fp-ts/Either';

@Injectable()
export class SignUpUserService implements SignUpUserUseCase {
  constructor(
    @Inject(SAVE_USER_PORT)
    private readonly userSaver: SaveUserPort,
    @Inject(EXISTS_BY_USERNAME_OR_EMAIL_PORT)
    private readonly existsUser: ExistsByUsernameOrEmailPort,
    @Inject(TOKEN_PROVIDER_PORT)
    private readonly tokenProvider: TokenProviderPort,
  ) {}

  public async signUp(
    command: SignUpUserCommand,
  ): Promise<E.Either<SignUpUserErrors, { user: User; token: string }>> {
    if (
      await this.existsUser.existsByUsernameOrEmail(
        command.username,
        command.email,
      )
    ) {
      return E.left(SignUpUserErrors.UsernameOrEmailTaken);
    }
    const user = new User(
      null,
      command.username,
      command.email,
      command.password,
    );

    const savedUser = await this.userSaver.save(await user.hashPassword());

    return E.right({
      user: savedUser,
      token: this.tokenProvider.signToken(savedUser.id, savedUser.username),
    });
  }
}
