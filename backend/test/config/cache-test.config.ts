import {
  CacheModuleOptions,
  CacheOptionsFactory,
  Injectable,
} from '@nestjs/common';
import redisStore from 'cache-manager-redis-store';

@Injectable()
export class CacheTestConfigService implements CacheOptionsFactory {
  createCacheOptions(): CacheModuleOptions {
    return {
      store: redisStore,
      host: 'localhost',
      port: 6380,
    };
  }
}
