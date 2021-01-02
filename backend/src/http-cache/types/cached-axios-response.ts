import { AxiosResponse } from 'axios';

export interface CachedAxiosResponse extends AxiosResponse {
  isCached?: boolean;
}
