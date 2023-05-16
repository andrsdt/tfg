import { api } from '@/lib/api';

import { Client, Components, Paths } from '@/types/openapi';
import { OperationResponse } from 'openapi-client-axios';

export type LoginCredentialsDTO = Components.Schemas.CustomLoginRequest;

export const loginWithEmailAndPassword = async (
  data: LoginCredentialsDTO
): Promise<OperationResponse<Paths.AuthLoginCreate.Responses.$200>> => {
  const client = await api.getClient<Client>();
  return client.auth_login_create(null, {
    email: data.email,
    password: data.password,
  });
};
