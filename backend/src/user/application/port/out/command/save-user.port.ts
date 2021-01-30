import { User } from '../../../../domain/model/user.domain-model';

export interface SaveUserPort {
  save(user: User): Promise<User>;
}

export const SAVE_USER_PORT = Symbol('SAVE_USER_PORT');
