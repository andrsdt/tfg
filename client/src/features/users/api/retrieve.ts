import { getApiClient } from '@/lib/api';

import { Paths } from '@/types/openapi';
import { OperationResponse } from 'openapi-client-axios';

export const retrieveUser = async (
  id: string
): Promise<OperationResponse<Paths.UsersRetrieve.Responses.$200>> => {
  const client = await getApiClient();
  return await client.users_retrieve(id);
};
