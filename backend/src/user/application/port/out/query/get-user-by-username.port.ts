import { User } from '../../../../domain/models/user.domain-model';

export interface GetUserByUsernamePort {
  getByUsername(username: string): Promise<User | undefined>;
}

export const GET_USER_BY_USERNAME_PORT = Symbol('GET_USER_BY_USERNAME_PORT');
