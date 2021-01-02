import {
  CACHE_MANAGER,
  CacheModule,
  HttpModule,
  HttpService,
  Inject,
  Module,
  OnModuleInit,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import { TmdbClientService } from './tmdb-client.service';
import { TmbdHttpConfigService } from './tmdb-http-config.service';
import redisStore from 'cache-manager-redis-store';
import camelcaseKeys from 'camelcase-keys';

@Module({
  imports: [
    HttpModule.registerAsync({ useClass: TmbdHttpConfigService }),
    CacheModule.register({
      store: redisStore,
      host: 'localhost',
      port: 6379,
    }),
  ],
  providers: [TmdbClientService],
})
export class TmdbModule implements OnModuleInit {
  constructor(
    private readonly httpService: HttpService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  onModuleInit(): void {
    this.httpService.axiosRef.interceptors.response.use(async (response) => {
      response.data = camelcaseKeys(response.data, { deep: true });
      await this.cacheManager.set(response.config.url, response, {
        ttl: 10000,
      });
      return response;
    });

    this.httpService.axiosRef.interceptors.request.use(async (request) => {
      if (request.method === 'get') {
        return;
      }
      const cached = await this.cacheManager.get(request.url);
      if (!cached) {
        return request;
      }
      request.adapter = () => {
        return Promise.resolve(cached);
      };
    });
  }
}
