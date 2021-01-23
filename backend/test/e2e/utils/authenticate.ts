import { SignUpRequestDto } from '../../../dist/user/adapter/in/web/dto/request/sign-up-request.dto';
import { signUpRequestFactory } from '../../factories/user';
import request from 'supertest';
import { INestApplication } from '@nestjs/common';

export const authenticate = async (
  app: INestApplication,
  partialBody?: Partial<SignUpRequestDto>,
) => {
  const body = signUpRequestFactory.buildOne(partialBody);

  const response = await request(app.getHttpServer())
    .post('/auth/sign-up')
    .send(body);

  const agent = request.agent(app.getHttpServer());

  agent.set('Authorization', `Bearer ${response.body.token}`);

  return {
    token: response.body.token,
    username: response.body.username,
    password: body.password,
    authenticatedRequest: agent,
  };
};
