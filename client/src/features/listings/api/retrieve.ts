import { api } from '@/lib/api';

import { Client, Paths } from '@/types/openapi';
import { OperationResponse } from 'openapi-client-axios';

export const retrieveListing = async (
  id: string
): Promise<OperationResponse<Paths.ListingsRetrieve.Responses.$200>> => {
  const client = await api.getClient<Client>();
  return await client.listings_retrieve(id);
};
