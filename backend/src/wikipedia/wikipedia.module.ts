import { HttpModule, HttpService, Module, OnModuleInit } from '@nestjs/common';
import { WikipediaService } from './wikipedia.service';
import { HttpCacheModule } from '../http-cache/http-cache.module';
import { HttpCacheService } from '../http-cache/http-cache.service';

@Module({
  imports: [
    HttpModule.register({
      timeout: 10000,
      maxRedirects: 5,
    }),
    HttpCacheModule,
  ],
  providers: [WikipediaService],
  exports: [WikipediaService],
})
export class WikipediaModule implements OnModuleInit {
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
