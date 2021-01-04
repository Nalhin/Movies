import { HttpModule, HttpService, Module, OnModuleInit } from '@nestjs/common';
import { WikipediaPlotDetailsService } from './wikipedia-plot-details.service';
import { HttpCacheModule } from '../../../../../core/http-cache/http-cache.module';
import { HttpCacheService } from '../../../../../core/http-cache/http-cache.service';

@Module({
  imports: [
    HttpModule.register({
      timeout: 10000,
      maxRedirects: 5,
    }),
    HttpCacheModule,
  ],
  providers: [WikipediaPlotDetailsService],
  exports: [WikipediaPlotDetailsService],
})
export class WikipediaPlotDetailsModule implements OnModuleInit {
  constructor(
    private readonly httpService: HttpService,
    private readonly httpCacheService: HttpCacheService,
  ) {}

  onModuleInit(): void {
    this.httpCacheService.applyToAxios(this.httpService.axiosRef);
  }
}
