import request from 'supertest';
import {
  loginRequestFactory,
  signUpRequestFactory,
} from '../../factories/user';
import { E2EApp, initializeApp } from '../utils/initialize-app';
import { authenticate } from '../utils/authenticate';

describe('Auth API', () => {
  let e2eTest: E2EApp;

  beforeEach(async () => {
    e2eTest = await initializeApp();
  });

  afterEach(async () => {
    await e2eTest.cleanup();
  });

  describe('POST /auth/sign-up', () => {
    it('should return 422 (UNPROCESSABLE_ENTITY) status code when credentials are taken', async () => {
      const requestBody = signUpRequestFactory.buildOne();
      await authenticate(e2eTest.app, requestBody);

      return request(e2eTest.app.getHttpServer())
        .post('/auth/sign-up')
        .send(requestBody)
        .expect(422);
    });

    it('should return 400 (BAD_REQUEST) status code when request body is invalid', async () => {
      const requestBody = signUpRequestFactory.buildOne({ email: 'fake' });

      const response = await request(e2eTest.app.getHttpServer())
        .post('/auth/sign-up')
        .send(requestBody)
        .expect(400);

      expect(response.body.message).toContainEqual(
        expect.stringContaining('email'),
      );
    });

    it('should return 200 (OK) status code with user data and valid token', async () => {
      const requestBody = signUpRequestFactory.buildOne();

      const response = await request(e2eTest.app.getHttpServer())
        .post('/auth/sign-up')
        .send(requestBody)
        .expect(200);

      expect(response.body.user.username).toBe(requestBody.username);
    });
  });

  describe('POST /auth/login', () => {
    it('should return 403 (FORBIDDEN) status code when credentials are invalid', async () => {
      const requestBody = loginRequestFactory.buildOne();
      await authenticate(e2eTest.app, { username: requestBody.username });

      return request(e2eTest.app.getHttpServer())
        .post('/auth/login')
        .send(requestBody)
        .expect(403);
    });

    it('should return 200 (OK) status code with user data and valid token', async () => {
      const requestBody = loginRequestFactory.buildOne();
      await authenticate(e2eTest.app, requestBody);

      const response = await request(e2eTest.app.getHttpServer())
        .post('/auth/login')
        .send(requestBody)
        .expect(200);

      expect(response.body.user.username).toBe(requestBody.username);
      expect(response.body.token).toBeString();
    });
  });
});
