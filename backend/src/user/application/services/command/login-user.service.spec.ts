import { Test } from '@nestjs/testing';
import * as O from 'fp-ts/Option';
import * as E from 'fp-ts/Either';
import { User } from '../../../domain/models/user.domain-model';
import { GET_USER_BY_USERNAME_PORT } from '../../port/out/query/get-user-by-username.port';
import { TOKEN_PROVIDER_PORT } from '../../port/out/query/token-provider.port';
import { LoginUserService } from './login-user.service';
import {
  LoginUserCommand,
  LoginUserErrors,
} from '../../port/in/command/login-user.use-case';

describe('LoginUserService', () => {
  const getUserByUsernamePort = {
    getByUsername: jest.fn(),
  };
  const tokenProviderPort = {
    signToken: jest.fn(),
  };
  let service: LoginUserService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        LoginUserService,
        { provide: GET_USER_BY_USERNAME_PORT, useValue: getUserByUsernamePort },
        {
          provide: TOKEN_PROVIDER_PORT,
          useValue: tokenProviderPort,
        },
      ],
    }).compile();

    service = moduleRef.get(LoginUserService);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('login()', () => {
    it('should return invalid credentials error when user is not found', async () => {
      getUserByUsernamePort.getByUsername.mockResolvedValueOnce(O.none);

      const actualResult = (await service.login(
        new LoginUserCommand('username', 'password'),
      )) as E.Left<LoginUserErrors>;

      expect(E.isLeft(actualResult)).toBeTrue();
      expect(actualResult.left).toBe(LoginUserErrors.InvalidCredentials);
    });

    it('should return invalid credentials error when passwords are not equal', async () => {
      getUserByUsernamePort.getByUsername.mockResolvedValueOnce(
        await O.some(
          await new User(1, 'username', 'email', 'invalid').hashPassword(),
        ),
      );

      const actualResult = (await service.login(
        new LoginUserCommand('username', 'password'),
      )) as E.Left<LoginUserErrors>;

      expect(E.isLeft(actualResult)).toBeTrue();
      expect(actualResult.left).toBe(LoginUserErrors.InvalidCredentials);
    });

    it('should return user and token', async () => {
      const user = await new User(
        1,
        'username',
        'email',
        'password',
      ).hashPassword();
      getUserByUsernamePort.getByUsername.mockResolvedValueOnce(O.some(user));
      tokenProviderPort.signToken.mockReturnValue('token');

      const actualResult = (await service.login(
        new LoginUserCommand('username', 'password'),
      )) as E.Right<{ user: User; token: string }>;

      expect(E.isRight(actualResult)).toBeTrue();
      expect(actualResult.right).toStrictEqual({ user, token: 'token' });
      expect(tokenProviderPort.signToken).toBeCalledWith(1, 'username');
    });
  });
});
