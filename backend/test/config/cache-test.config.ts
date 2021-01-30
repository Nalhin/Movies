import {
  CacheModuleOptions,
  CacheOptionsFactory,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class CacheTestConfigService implements CacheOptionsFactory {
  createCacheOptions(): CacheModuleOptions {
    return {};
  }
}
