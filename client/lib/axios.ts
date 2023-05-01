import OpenAPIClientAxios from 'openapi-client-axios';
import type { Client as GrocerinClient } from '@/types/openapi.d.ts';

const api = new OpenAPIClientAxios({
  definition: `${process.env.NEXT_PUBLIC_URL}/api/v1/schema/`,
});
api.init();

api.axiosConfigDefaults.xsrfHeaderName = 'X-CSRFToken';
api.axiosConfigDefaults.xsrfCookieName = 'csrftoken';
api.axiosConfigDefaults.withCredentials = true;

export default api;
