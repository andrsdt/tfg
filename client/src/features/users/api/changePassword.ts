import { getApiClient } from '@/lib/api';

import { Components, Paths } from '@/types/openapi';
import { OperationResponse } from 'openapi-client-axios';

export type ChangePasswordValues = {
  new_password1: string;
  new_password2: string;
};

export type ChangePasswordDTO = Components.Schemas.PasswordChangeRequest;

export const changePassword = async (
  data: ChangePasswordDTO
): Promise<
  OperationResponse<Paths.AuthPasswordChangeCreate.Responses.$200>
> => {
  const client = await getApiClient();
  return await client.auth_password_change_create(null, {
    new_password1: data.new_password1,
    new_password2: data.new_password2,
  });
};
