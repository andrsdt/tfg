import { api } from '@/lib/api';

import { Client, Components, Paths } from '@/types/openapi';
import { OperationResponse } from 'openapi-client-axios';

export type UpdateProfileDTO =
  Components.Schemas.PatchedCustomUserDetailsRequest;
export const updateProfile = async (
  data: UpdateProfileDTO
): Promise<OperationResponse<Paths.AuthUserPartialUpdate.Responses.$200>> => {
  const client = await api.getClient<Client>();
  return await client.auth_user_partial_update(null, {
    first_name: data.first_name,
    last_name: data.last_name,
    phone: data.phone,
    photo: data.photo,
    location: data.location,
  });
};
