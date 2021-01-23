import { FIND_USER_BY_USERNAME_USE_CASE } from '../../../../application/port/in/query/find-user-by-username-use.case';
import { Test } from '@nestjs/testing';
import { JwtStrategy } from './jwt.strategy';
import * as O from 'fp-ts/Option';
import { User } from '../../../../domain/models/user.domain-model';
import { jwtConfig } from '../../../../../core/config/jwt.config';

describe('JwtStrategy', () => {
  const getUserByUsernameUseCase = {
    findByUsername: jest.fn(),
  };
  let jwtStrategy: JwtStrategy;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        JwtStrategy,
        { provide: jwtConfig.KEY, useValue: { secret: 'secret' } },
        {
          provide: FIND_USER_BY_USERNAME_USE_CASE,
          useValue: getUserByUsernameUseCase,
        },
      ],
    }).compile();

    jwtStrategy = moduleRef.get(JwtStrategy);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('validate()', () => {
    it('should return anonymous user when username is not present in payload', async () => {
      const actualUser = await jwtStrategy.validate({});

      expect(actualUser.isAuthenticated).toBeFalsy();
    });

    it('should return anonymous user when user with corresponding username is not found', async () => {
      getUserByUsernameUseCase.findByUsername.mockResolvedValueOnce(O.none);

      const actualUser = await jwtStrategy.validate({ username: 'username' });

      expect(actualUser.isAuthenticated).toBeFalsy();
      expect(getUserByUsernameUseCase.findByUsername).toBeCalledWith(
        'username',
      );
    });

    it('should return authorized user when found', async () => {
      getUserByUsernameUseCase.findByUsername.mockResolvedValueOnce(
        O.some(new User(1, 'username', 'email', 'password')),
      );

      const actualUser = await jwtStrategy.validate({ username: 'username' });

      expect(actualUser.username).toBe('username');
      expect(actualUser.isAuthenticated).toBeTrue();
      expect(actualUser.id).toBe(1);
      expect(getUserByUsernameUseCase.findByUsername).toBeCalledWith(
        'username',
      );
    });
  });
});
