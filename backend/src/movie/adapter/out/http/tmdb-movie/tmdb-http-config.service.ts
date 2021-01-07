import {
  HttpModuleOptions,
  HttpModuleOptionsFactory,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class TmbdHttpConfigService implements HttpModuleOptionsFactory {
  createHttpOptions(): HttpModuleOptions {
    return {
      timeout: 5000,
      maxRedirects: 5,
      baseURL: 'https://api.themoviedb.org/3',
      params: {
        api_key: process.env.TMBD_API_KEY,
      },
    };
  }
}
