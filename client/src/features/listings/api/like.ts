import { api } from '@/lib/api';

import { Client, Paths } from '@/types/openapi';
import { OperationResponse } from 'openapi-client-axios';

export const likeListing = async (params: {
  id: number;
}): Promise<OperationResponse<Paths.ListingsLikeCreate.Responses.$200>> => {
  const client = await api.getClient<Client>();
  return await client.listings_like_create({ id: params.id });
};
