import { getApiClient } from '@/lib/api';

import { Paths } from '@/types/openapi';
import { OperationResponse } from 'openapi-client-axios';

export type SignupCredentialsDTO = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export const signupWithEmailAndPassword = async (
  data: SignupCredentialsDTO
): Promise<OperationResponse<Paths.AuthRegistrationCreate.Responses.$201>> => {
  const client = await getApiClient();
  return client.auth_registration_create(null, {
    email: data.email,
    password1: data.password,
    password2: data.password,
    first_name: data.firstName,
    last_name: data.lastName,
  });
};
