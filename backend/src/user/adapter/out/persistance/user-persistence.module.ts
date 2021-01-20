import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './database/user.repository';
import { UserPersistenceQueryAdapter } from './user-persistence-query.adapter';
import { UserPersistenceCommandAdapter } from './user-persistance-command.adapter';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])],
  providers: [UserPersistenceQueryAdapter, UserPersistenceCommandAdapter],
  exports: [
    UserPersistenceQueryAdapter,
    UserPersistenceCommandAdapter,
    TypeOrmModule,
  ],
})
export class UserPersistenceModule {}
