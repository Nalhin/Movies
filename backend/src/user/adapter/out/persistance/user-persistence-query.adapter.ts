import { Injectable } from '@nestjs/common';
import { UserRepository } from './database/user.repository';
import { ExistsByUsernameOrEmailPort } from '../../../application/port/out/query/exists-by-username-or-email.port';
import { GetUserByUsernamePort } from '../../../application/port/out/query/get-user-by-username.port';
import { User } from '../../../domain/models/user.domain-model';

@Injectable()
export class UserPersistenceQueryAdapter
  implements ExistsByUsernameOrEmailPort, GetUserByUsernamePort {
  constructor(private readonly userRepository: UserRepository) {}

  existsByUsernameOrEmail(username: string, email: string): Promise<boolean> {
    return this.userRepository.existsByEmailOrUsername(email, username);
  }

  async getByUsername(username: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({ username });
    return new User(user.id, user.username, user.email, user.password);
  }
}
