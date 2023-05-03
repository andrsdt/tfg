import { api } from '@/lib/api';

import { Client, Paths } from '@/types/openapi';
import { OperationResponse } from 'openapi-client-axios';

export type LoginCredentialsDTO = {
  email: string;
  password: string;
};

export const loginWithEmailAndPassword = async (
  data: LoginCredentialsDTO
): Promise<OperationResponse<Paths.ApiV1AuthLoginCreate.Responses.$200>> => {
  const client = await api.getClient<Client>();
  return client.api_v1_auth_login_create(null, {
    email: data.email,
    password: data.password,
  });
};
