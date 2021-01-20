import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from './user.entity';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  public async existsByEmailOrUsername(
    email: string,
    username: string,
  ): Promise<boolean> {
    const count = await this.createQueryBuilder()
      .where('email = :email', { email })
      .orWhere('username = :username', { username })
      .getCount();

    return count > 0;
  }
}
