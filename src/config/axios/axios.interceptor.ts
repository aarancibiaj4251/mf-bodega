import {apiClient} from './axios.config';
import keycloak from '../auth/keycloak.config';

apiClient.interceptors.request.use(config => {
  let headers = {};
  if (keycloak.authenticated) {
    headers['Authorization'] = `Bearer ${keycloak.token}`;
  }
  config.headers = headers;
  return config;
})
