import { Test } from '@nestjs/testing';
import { GET_USER_BY_USERNAME_PORT } from '../../port/out/query/get-user-by-username.port';
import * as O from 'fp-ts/Option';
import { FindUserByUsernameService } from './find-user-by-username.service';
import { User } from '../../../domain/models/user.domain-model';

describe('FindUserByUsernameService', () => {
  const getUserByUsernamePort = {
    getByUsername: jest.fn(),
  };

  let service: FindUserByUsernameService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        FindUserByUsernameService,
        {
          provide: GET_USER_BY_USERNAME_PORT,
          useValue: getUserByUsernamePort,
        },
      ],
    }).compile();

    service = moduleRef.get(FindUserByUsernameService);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('findByUsername()', () => {
    it('should return none when user is not found', async () => {
      getUserByUsernamePort.getByUsername.mockResolvedValueOnce(O.none);

      const result = await service.findByUsername('username');

      expect(O.isNone(result)).toBeTrue();
      expect(getUserByUsernamePort.getByUsername).toBeCalledWith('username');
    });

    it('should return user when found', async () => {
      const expectedResult = O.some(
        new User(1, 'username', 'email', 'password'),
      );
      getUserByUsernamePort.getByUsername.mockResolvedValueOnce(expectedResult);

      const result = (await service.findByUsername('username')) as O.Some<User>;

      expect(result).toStrictEqual(result);
      expect(getUserByUsernamePort.getByUsername).toBeCalledWith('username');
    });
  });
});
