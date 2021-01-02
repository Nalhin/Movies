import { HttpModule, HttpService, Module, OnModuleInit } from '@nestjs/common';
import { TmdbClientService } from './tmdb-client.service';
import { TmbdHttpConfigService } from './tmdb-http-config.service';
import { HttpCacheService } from '../http-cache/http-cache.service';
import { HttpCacheModule } from '../http-cache/http-cache.module';

@Module({
  imports: [
    HttpModule.registerAsync({ useClass: TmbdHttpConfigService }),
    HttpCacheModule,
  ],
  providers: [TmdbClientService, HttpCacheService],
  exports: [TmdbClientService],
})
export class TmdbModule implements OnModuleInit {
  constructor(
    private readonly httpService: HttpService,
    private readonly httpCacheService: HttpCacheService,
  ) {}

  onModuleInit(): void {
    this.httpService.axiosRef.interceptors.response.use((res) =>
      this.httpCacheService.onResponse(res),
    );
    this.httpService.axiosRef.interceptors.request.use(
      (res) => this.httpCacheService.onRequest(res),
      (error) => Promise.reject(error),
    );
  }
}
