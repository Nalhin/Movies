import { Injectable } from '@nestjs/common';
import { User } from '../../../domain/models/user.domain-model';
import { Inject } from '@nestjs/common/decorators/core';
import {
  GET_USER_BY_USERNAME_PORT,
  GetUserByUsernamePort,
} from '../../port/out/query/get-user-by-username.port';
import { Option } from 'fp-ts/Option';

@Injectable()
export class FindUserByUsername implements FindUserByUsername {
  constructor(
    @Inject(GET_USER_BY_USERNAME_PORT)
    private readonly users: GetUserByUsernamePort,
  ) {}

  getByUsername(username: string): Promise<Option<User>> {
    return this.users.getByUsername(username);
  }
}
