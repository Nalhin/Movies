import { CacheModule, Module } from '@nestjs/common';
import { HttpCacheService } from './http-cache.service';
import { CacheConfigService } from '../config/cache.config';

@Module({
  imports: [CacheModule.register({ useClass: CacheConfigService })],
  providers: [HttpCacheService],
  exports: [HttpCacheService, CacheModule],
})
export class HttpCacheModule {}
