import { API_URL } from '@/config';
import { APIError } from '@/types/errrors';
import { emitError, emitSuccess } from '@/utils/errors';
import OpenAPIClientAxios, {
  AxiosError,
  AxiosResponse,
} from 'openapi-client-axios';

export const api = new OpenAPIClientAxios({
  definition: `${API_URL}/api/v1/schema/`,
});

const responseInterceptor = (response: AxiosResponse) => {
  console.log('USING INTERCEPTOR - SUCCESS');
  const title = `${response?.status} ${response?.statusText}`;
  const message = response?.data?.message;
  console.table({ title, message });
  if (message) emitSuccess({ title, message });
  return Promise.resolve(response.data);
};

const errorInterceptor = (error: AxiosError) => {
  console.log('USING INTERCEPTOR - ERROR IN RESPONSE');
  const response = error.response.data as APIError;
  response.errors.forEach((err) => {
    const title = `${err.code} ${err.attr}`;
    const message = err.detail;
    if (message) emitError({ title, message });
  });
  return Promise.reject(error);
};

api.init().then((client) => {
  client.interceptors.response.clear();
  client.interceptors.response.use(responseInterceptor, errorInterceptor);
});

api.axiosConfigDefaults.xsrfHeaderName = 'X-CSRFToken';
api.axiosConfigDefaults.xsrfCookieName = 'csrftoken';
api.axiosConfigDefaults.withCredentials = true;
