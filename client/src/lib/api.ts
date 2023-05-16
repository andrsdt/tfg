import { API_URL } from '@/config';
import { APIError } from '@/types/errors';
import { Client } from '@/types/openapi';
import { getCookie } from '@/utils/cookies';
import { emitError, emitSuccess } from '@/utils/notifications';
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
      const client = await api.getClient<Client>();
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
    if (!IGNORED_ERRORS.includes(err.code) && message)
      emitError({ title, message });
  });
  return Promise.reject(error);
};

api.init().then((client) => {
  client.interceptors.request.clear();
  client.interceptors.request.use(requestInterceptor);

  client.interceptors.response.clear();
  client.interceptors.response.use(responseInterceptor, errorInterceptor);
});

api.axiosConfigDefaults.xsrfHeaderName = 'X-CSRFToken';
api.axiosConfigDefaults.xsrfCookieName = 'csrftoken';
api.axiosConfigDefaults.withCredentials = true;
