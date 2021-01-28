import { E2EApp, initializeApp } from '../utils/initialize-app';
import { authenticate } from '../utils/authenticate';
import request from 'supertest';
import { HttpStatus } from '@nestjs/common';

describe('User API', () => {
  let e2eTest: E2EApp;

  beforeEach(async () => {
    e2eTest = await initializeApp();
  });

  afterEach(async () => {
    await e2eTest.cleanup();
  });

  describe('GET /me', () => {
    it('should return 403 (FORBIDDEN) status code when user is not authenticated', async () => {
      return request(e2eTest.app.getHttpServer())
        .get('/me')
        .expect(HttpStatus.FORBIDDEN);
    });

    it('should return 200 (OK) status code and user data', async () => {
      const { authenticatedRequest } = await authenticate(e2eTest.app, {
        username: 'username',
      });

      const response = await authenticatedRequest
        .get('/me')
        .expect(HttpStatus.OK);

      expect(response.body.username).toBe('username');
    });
  });
});
