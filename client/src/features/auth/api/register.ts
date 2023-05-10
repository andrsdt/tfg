import { api } from '@/lib/api';

import { Client, Paths } from '@/types/openapi';
import { OperationResponse } from 'openapi-client-axios';

export type SignupCredentialsDTO = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export const signupWithEmailAndPassword = async (
  data: SignupCredentialsDTO
): Promise<
  OperationResponse<Paths.ApiV1AuthRegistrationCreate.Responses.$201>
> => {
  const client = await api.getClient<Client>();
  return client.api_v1_auth_registration_create(null, {
    email: data.email,
    password1: data.password,
    password2: data.password,
    first_name: data.firstName,
    last_name: data.lastName,
  });
};
