import {
  HttpModuleOptions,
  HttpModuleOptionsFactory,
  Injectable,
} from '@nestjs/common';
import camelcaseKeys from 'camelcase-keys';
import axios from 'axios';

@Injectable()
export class TmbdHttpConfigService implements HttpModuleOptionsFactory {
  createHttpOptions(): HttpModuleOptions {
    return {
      timeout: 5000,
      maxRedirects: 5,
      transformResponse: [].concat(axios.defaults.transformResponse, (data) =>
        camelcaseKeys(data, { deep: true }),
      ),
      baseURL: 'https://api.themoviedb.org/3',
      params: {
        api_key: process.env.TMBD_API_KEY,
      },
    };
  }
}
