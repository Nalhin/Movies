import { FactoryBuilder } from 'factory.io';
import * as faker from 'faker';
import { UserEntity } from '../../src/user/adapter/out/persistance/database/user.entity';
import { LoginRequestDto } from '../../src/user/adapter/in/web/dto/request/login-request.dto';
import { SignUpRequestDto } from '../../src/user/adapter/in/web/dto/request/sign-up-request.dto';

export const loginRequestFactory = FactoryBuilder.of(LoginRequestDto)
  .props({
    username: faker.internet.userName,
    password: faker.internet.password,
  })
  .build();

export const signUpRequestFactory = FactoryBuilder.of(SignUpRequestDto)
  .mixins([loginRequestFactory])
  .props({ email: faker.internet.email })
  .build();

export const userEntityFactory = FactoryBuilder.of(UserEntity)
  .mixins([signUpRequestFactory])
  .build();
