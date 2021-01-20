import { User } from '../../../../domain/models/user.domain-model';

export interface GetByUsernameUseCase {
  getByUsername(username: string): Promise<User>;
}

export const GET_USER_BY_USERNAME_USE_CASE = Symbol(
  'GET_USER_BY_USERNAME_USE_CASE',
);
