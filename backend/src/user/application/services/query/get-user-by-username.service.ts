import { Injectable } from '@nestjs/common';
import { GetByUsernameUseCase } from '../../port/in/query/get-by-username.use-case';
import { User } from '../../../domain/models/user.domain-model';
import { Inject } from '@nestjs/common/decorators/core';
import {
  GET_USER_BY_USERNAME_PORT,
  GetUserByUsernamePort,
} from '../../port/out/query/get-user-by-username.port';

@Injectable()
export class GetUserByUsernameService implements GetByUsernameUseCase {
  constructor(
    @Inject(GET_USER_BY_USERNAME_PORT)
    private readonly getUserByUsernamePort: GetUserByUsernamePort,
  ) {}

  getByUsername(username: string): Promise<User> {
    return this.getUserByUsernamePort.getByUsername(username);
  }
}
