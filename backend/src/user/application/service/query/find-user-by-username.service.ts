import { Injectable } from '@nestjs/common';
import { User } from '../../../domain/model/user.domain-model';
import { Inject } from '@nestjs/common/decorators/core';
import {
  GET_USER_BY_USERNAME_PORT,
  GetUserByUsernamePort,
} from '../../port/out/query/get-user-by-username.port';
import { Option } from 'fp-ts/Option';
import { FindUserByUsernameUseCase } from '../../port/in/query/find-user-by-username-use.case';

@Injectable()
export class FindUserByUsernameService implements FindUserByUsernameUseCase {
  constructor(
    @Inject(GET_USER_BY_USERNAME_PORT)
    private readonly users: GetUserByUsernamePort,
  ) {}

  findByUsername(username: string): Promise<Option<User>> {
    return this.users.getByUsername(username);
  }
}
