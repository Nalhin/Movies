import { CACHE_MANAGER, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { AxiosInstance, AxiosRequestConfig } from 'axios';
import camelcaseKeys from 'camelcase-keys';
import { CachedAxiosResponse } from './types/cached-axios-response';
import qs from 'query-string';

@Injectable()
export class HttpCacheService {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  private getKey({ baseURL = '', params = {}, url = '' }) {
    return qs.stringifyUrl({ url: baseURL + url, query: params });
  }

  private async onRequest(
    request: AxiosRequestConfig,
  ): Promise<AxiosRequestConfig> {
    if (request.method !== 'get') {
      return request;
    }

    const cached = await this.cacheManager.get(this.getKey(request));
    if (!cached) {
      return request;
    }
    request.adapter = () => {
      return Promise.resolve({
        status: HttpStatus.OK,
        data: cached,
        isCached: true,
      } as CachedAxiosResponse);
    };
    return request;
  }

  private async onResponse(
    response: CachedAxiosResponse,
  ): Promise<CachedAxiosResponse> {
    if (response.isCached) {
      return response;
    }

    response.data = camelcaseKeys(response.data, { deep: true });

    if (response.status === HttpStatus.OK) {
      await this.cacheManager.set(this.getKey(response.config), response.data, {
        ttl: 10000,
      });
    }

    return response;
  }

  public applyToAxios(axiosInstance: AxiosInstance): void {
    axiosInstance.interceptors.response.use((res) => this.onResponse(res));
    axiosInstance.interceptors.request.use((res) => this.onRequest(res));
  }
}
