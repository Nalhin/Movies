import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { getMetadataArgsStorage } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TypeormTestConfig implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'user',
      password: 'password',
      database: 'movies_db_test',
      entities: getMetadataArgsStorage().tables.map((t) => t.target),
      keepConnectionAlive: true,
      dropSchema: true,
      synchronize: true,
    };
  }
}
