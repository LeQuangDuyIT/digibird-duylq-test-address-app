import axios from 'axios';
import { TOKEN_TYPES } from '~/utils/constants';
import { PATH } from '~/routes';

const BASE_API_URL = 'https://test-pos.digibird.io/api/v1/front';

const api = axios.create({
  baseURL: BASE_API_URL,
  timeout: 10000
});

// Attach accessToken to request headers
api.interceptors.request.use(config => {
  const accessToken = localStorage.getItem(TOKEN_TYPES.ACCESS_TOKEN);

  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  }

  return config;
});

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 401) {
      localStorage.removeItem(TOKEN_TYPES.ACCESS_TOKEN);
      window.location.href = PATH.ADDRESS;
    }
  }
);

export default api;
