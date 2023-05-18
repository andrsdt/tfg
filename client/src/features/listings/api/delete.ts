import { api } from '@/lib/api';

import { Client, Paths } from '@/types/openapi';
import { OperationResponse } from 'openapi-client-axios';

export const deleteListing = async (params: {
  id: number;
}): Promise<OperationResponse<Paths.ListingsDestroy.Responses.$204>> => {
  const client = await api.getClient<Client>();
  return await client.listings_destroy({
    id: params.id,
  });
};
