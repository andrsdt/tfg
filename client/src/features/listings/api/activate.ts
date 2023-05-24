import { getApiClient } from '@/lib/api';

import { Paths } from '@/types/openapi';
import { OperationResponse } from 'openapi-client-axios';

export const activateListing = async (params: {
  id: string;
}): Promise<OperationResponse<Paths.ListingsActivateCreate.Responses.$204>> => {
  const client = await getApiClient();
  return await client.listings_activate_create({
    id: Number.parseInt(params.id),
  });
};
