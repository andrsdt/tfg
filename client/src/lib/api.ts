import { API_URL } from '@/config';
import { APIError } from '@/types/errors';
import { Client } from '@/types/openapi';
import { getCookie } from '@/utils/cookies';
import { emitError, emitSuccess } from '@/utils/toasts';
import OpenAPIClientAxios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'openapi-client-axios';

export const api = new OpenAPIClientAxios({
  definition: `${API_URL}/api/v1/schema/`,
});

// Fetch CSRF token when needed if it doesn't exist in cookies
const requestInterceptor = async (request: InternalAxiosRequestConfig) => {
  if (['post', 'put', 'patch', 'delete'].includes(request.method)) {
    const csrfToken = getCookie('csrftoken');
    if (!csrfToken) {
      const client = await getApiClient();
      await client.auth_set_csrf_retrieve();
    }
  }

  return request;
};

const responseInterceptor = (response: AxiosResponse) => {
  const title = `${response?.status} ${response?.statusText}`;
  const message = response?.data?.message;
  if (message) emitSuccess({ title, message });
  return Promise.resolve(response.data);
};

const errorInterceptor = (error: AxiosError) => {
  const IGNORED_ERRORS = ['not_authenticated'];
  const response = error.response?.data as APIError;

  response.errors?.forEach((err) => {
    const title = `${err.code}`;
    const message = err.attr ? `${err.attr}: ${err.detail}` : err.detail;
    if (IGNORED_ERRORS.includes(err.code)) {
      return Promise.reject(error);
    } else if (message) emitError({ title, message });
  });
  return Promise.reject(error);
};

const setInterceptorsIfMissing = (client) => {
  const hasInterceptors =
    client.interceptors.request.handlers.length > 0 &&
    client.interceptors.response.handlers.length > 0;
  if (hasInterceptors) return;

  client.interceptors.request.clear();
  client.interceptors.response.clear();

  client.interceptors.request.use(requestInterceptor);
  client.interceptors.response.use(responseInterceptor, errorInterceptor);
};

api.init();

export const getApiClient = async (): Promise<Client> => {
  const client = await api.getClient<Client>();
  setInterceptorsIfMissing(client);
  return client;
};

api.axiosConfigDefaults.xsrfHeaderName = 'X-CSRFToken';
api.axiosConfigDefaults.xsrfCookieName = 'csrftoken';
api.axiosConfigDefaults.withCredentials = true;
