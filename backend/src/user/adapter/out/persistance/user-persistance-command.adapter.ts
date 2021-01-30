import { Injectable } from '@nestjs/common';
import { UserRepository } from './database/user.repository';
import { SaveUserPort } from '../../../application/port/out/command/save-user.port';
import { User } from '../../../domain/model/user.domain-model';

@Injectable()
export class UserPersistenceCommandAdapter implements SaveUserPort {
  constructor(private readonly userRepository: UserRepository) {}

  async save(user: User): Promise<User> {
    const created = this.userRepository.create(user);
    const saved = await this.userRepository.save(created);
    return new User(saved.id, saved.username, saved.email, saved.password);
  }
}
