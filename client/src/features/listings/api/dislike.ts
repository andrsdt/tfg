import { api } from '@/lib/api';

import { Client, Paths } from '@/types/openapi';
import { OperationResponse } from 'openapi-client-axios';

export const dislikeListing = async (params: {
  id: number;
}): Promise<OperationResponse<Paths.ListingsDislikeCreate.Responses.$200>> => {
  const client = await api.getClient<Client>();
  return await client.listings_dislike_create({ id: params.id });
};
