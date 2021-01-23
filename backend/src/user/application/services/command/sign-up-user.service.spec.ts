import { Test } from '@nestjs/testing';
import { TOKEN_PROVIDER_PORT } from '../../port/out/query/token-provider.port';
import * as E from 'fp-ts/Either';
import { User } from '../../../domain/models/user.domain-model';
import { SignUpUserService } from './sign-up-user.service';
import { EXISTS_BY_USERNAME_OR_EMAIL_PORT } from '../../port/out/query/exists-by-username-or-email.port';
import { SAVE_USER_PORT } from '../../port/out/command/save-user.port';
import {
  SignUpUserCommand,
  SignUpUserErrors,
} from '../../port/in/command/sign-up-user.use-case';

describe('SignUpUserService', () => {
  const existsByUsernameOrEmailPort = {
    existsByUsernameOrEmail: jest.fn(),
  };
  const saveUserPort = {
    save: jest.fn(),
  };
  const tokenProviderPort = {
    signToken: jest.fn(),
  };
  let service: SignUpUserService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        SignUpUserService,
        {
          provide: SAVE_USER_PORT,
          useValue: saveUserPort,
        },
        {
          provide: EXISTS_BY_USERNAME_OR_EMAIL_PORT,
          useValue: existsByUsernameOrEmailPort,
        },
        {
          provide: TOKEN_PROVIDER_PORT,
          useValue: tokenProviderPort,
        },
      ],
    }).compile();

    service = moduleRef.get(SignUpUserService);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('signUp()', () => {
    it('should return UsernameOrEmailTaken error when username or email is taken', async () => {
      existsByUsernameOrEmailPort.existsByUsernameOrEmail.mockResolvedValueOnce(
        true,
      );

      const actualResult = (await service.signUp(
        new SignUpUserCommand('username', 'email@email.com', 'password'),
      )) as E.Left<SignUpUserErrors>;

      expect(E.isLeft(actualResult)).toBeTrue();
      expect(actualResult.left).toBe(SignUpUserErrors.UsernameOrEmailTaken);
      expect(
        existsByUsernameOrEmailPort.existsByUsernameOrEmail,
      ).toBeCalledWith('username', 'email@email.com');
    });

    it('should hash password before persistence', async () => {
      existsByUsernameOrEmailPort.existsByUsernameOrEmail.mockResolvedValueOnce(
        false,
      );
      saveUserPort.save.mockImplementation((e) => e);

      await service.signUp(
        new SignUpUserCommand('username', 'email@email.com', 'password'),
      );

      expect(saveUserPort.save).toBeCalledWith(
        expect.not.objectContaining({ password: 'password' }),
      );
    });

    it('should save user and return user data with token', async () => {
      existsByUsernameOrEmailPort.existsByUsernameOrEmail.mockResolvedValueOnce(
        false,
      );
      saveUserPort.save.mockImplementation((e) => e);
      tokenProviderPort.signToken.mockReturnValueOnce('token');

      const actualResult = (await service.signUp(
        new SignUpUserCommand('username', 'email@email.com', 'password'),
      )) as E.Right<{ user: User; token: string }>;

      expect(E.isRight(actualResult)).toBeTrue();
      expect(actualResult.right.user.username).toBe('username');
    });
  });
});
