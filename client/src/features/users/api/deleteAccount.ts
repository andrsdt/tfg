import { getApiClient } from '@/lib/api';

import { Paths } from '@/types/openapi';
import { OperationResponse } from 'openapi-client-axios';

export const deleteAccount = async (): Promise<
  OperationResponse<Paths.AuthUserDeleteDestroy.Responses.$204>
> => {
  const client = await getApiClient();
  return await client.auth_user_delete_destroy();
};
