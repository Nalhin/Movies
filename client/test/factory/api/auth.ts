import { FactoryBuilder } from 'factory.io';
import {
  AuthResponseDto,
  LoginRequestDto,
  SignUpRequestDto,
  UserResponseDto,
} from '../../../src/core/api/api.types';
import * as faker from 'faker';

export const userResponseFactory = FactoryBuilder.of<UserResponseDto>()
  .props({
    username: faker.internet.userName,
    email: faker.internet.email,
  })
  .build();

export const authResponseFactory = FactoryBuilder.of<AuthResponseDto>()
  .props({
    user: userResponseFactory.buildOne,
    token: faker.random.word,
  })
  .build();

export const loginUserFactory = FactoryBuilder.of<LoginRequestDto>()
  .props({
    username: faker.internet.userName,
    password: faker.internet.password,
  })
  .build();

export const signUpRequestFactory = FactoryBuilder.of<SignUpRequestDto>()
  .props({
    username: faker.internet.userName,
    password: faker.internet.password,
    email: faker.internet.email,
  })
  .build();
