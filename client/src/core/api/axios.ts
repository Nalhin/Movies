import defaultAxios from 'axios';
import { authStorage } from '../../shared/service/storage/auth-storage.service';

const instance = defaultAxios.create({
  baseURL: 'http://192.168.1.180:3000/api',
});

instance.interceptors.request.use((config) => {
  const authToken = authStorage.getAuthToken();
  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }
  return config;
});

export { instance as axios };
