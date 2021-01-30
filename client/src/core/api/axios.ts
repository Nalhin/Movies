import defaultAxios from 'axios';

const instance = defaultAxios.create({ baseURL: '/api' });

instance.interceptors.request.use((config) => {
  return config;
});

export { instance as axios };
