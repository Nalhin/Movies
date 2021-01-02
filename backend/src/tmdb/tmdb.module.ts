import { HttpModule, Module } from '@nestjs/common';
import { TmdbClientService } from './tmdb-client.service';
import { TmbdHttpConfigService } from './tmdb-http-config.service';

@Module({
  imports: [HttpModule.registerAsync({ useClass: TmbdHttpConfigService })],
  providers: [TmdbClientService],
})
export class TmdbModule {}
