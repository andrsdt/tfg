import { getApiClient } from '@/lib/api';

import { Components, Paths } from '@/types/openapi';
import { OperationResponse } from 'openapi-client-axios';

export type UpdateProfileValues = {
  first_name: string;
  last_name: string;
  photo: string;
  phone: string;
  location: string;
};

export type UpdateProfileDTO =
  Components.Schemas.PatchedCustomUserDetailsRequest;

export const updateProfile = async (
  data: UpdateProfileDTO
): Promise<OperationResponse<Paths.AuthUserPartialUpdate.Responses.$200>> => {
  const client = await getApiClient();
  return await client.auth_user_partial_update(null, {
    first_name: data.first_name,
    last_name: data.last_name,
    photo: data.photo,
    phone: data.phone?.length > 0 ? data.phone : undefined,
    location: data.location ?? undefined,
  });
};
