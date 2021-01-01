import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly usersRepository: UserRepository) {}

  public async save(user: Partial<User>): Promise<User> {
    const preparedUser = this.usersRepository.create({ ...user });
    return this.usersRepository.save(preparedUser);
  }

  public async findOneByUsername(username: string): Promise<User> {
    return this.usersRepository.findOne({ username });
  }

  public async existsByEmailOrUsername(
    email: string,
    username: string,
  ): Promise<boolean> {
    return this.usersRepository.existsByEmailOrUsername(email, username);
  }
}
