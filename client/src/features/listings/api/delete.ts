import { getApiClient } from '@/lib/api';

import { Paths } from '@/types/openapi';
import { OperationResponse } from 'openapi-client-axios';

export const deleteListing = async (params: {
  id: number;
}): Promise<OperationResponse<Paths.ListingsDestroy.Responses.$204>> => {
  const client = await getApiClient();
  return await client.listings_destroy({
    id: params.id,
  });
};
