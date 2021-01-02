import { CacheModule, Module } from '@nestjs/common';
import redisStore from 'cache-manager-redis-store';
import { HttpCacheService } from './http-cache.service';

@Module({
  imports: [
    CacheModule.register({
      store: redisStore,
      host: 'localhost',
      port: 6379,
    }),
  ],
  providers: [HttpCacheService],
  exports: [HttpCacheService, CacheModule],
})
export class HttpCacheModule {}
