import { User } from '../../../../domain/models/user.domain-model';
import { Option } from 'fp-ts/Option';

export interface GetUserByUsernamePort {
  getByUsername(username: string): Promise<Option<User>>;
}

export const GET_USER_BY_USERNAME_PORT = Symbol('GET_USER_BY_USERNAME_PORT');
