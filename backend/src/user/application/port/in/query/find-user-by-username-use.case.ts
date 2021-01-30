import { User } from '../../../../domain/model/user.domain-model';
import { Option } from 'fp-ts/Option';

export interface FindUserByUsernameUseCase {
  findByUsername(username: string): Promise<Option<User>>;
}

export const FIND_USER_BY_USERNAME_USE_CASE = Symbol(
  'FIND_USER_BY_USERNAME_USE_CASE',
);
