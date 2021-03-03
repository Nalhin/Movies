import defaultAxios from 'axios';
import { authStorage } from '../../shared/services/storage/auth-storage.service';
import Constants from 'expo-constants';

const instance = defaultAxios.create({
  baseURL: Constants.manifest.extra.API_BASE_URL,
});

instance.interceptors.request.use(async (config) => {
  const authToken = await authStorage.getAuthToken();
  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }
  return config;
});

export { instance as axios };
