import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly usersRepository: UserRepository) {}

  async saveOne(user: User): Promise<User> {
    const userEntity = await this.usersRepository.create({ ...user });
    return this.usersRepository.save(userEntity);
  }
}
