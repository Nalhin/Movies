import { HttpModule, HttpService, Module, OnModuleInit } from '@nestjs/common';
import { TmdbClientService } from './tmdb-client.service';
import { TmbdConfigService } from '../../../../../core/config/tmdb.config';
import { HttpCacheService } from '../../../../../core/http-cache/http-cache.service';
import { HttpCacheModule } from '../../../../../core/http-cache/http-cache.module';

@Module({
  imports: [
    HttpModule.registerAsync({ useClass: TmbdConfigService }),
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
    this.httpCacheService.applyToAxios(this.httpService.axiosRef);
  }
}
