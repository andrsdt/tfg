import { getApiClient } from '@/lib/api';

import { Paths } from '@/types/openapi';
import { OperationResponse } from 'openapi-client-axios';

export const dislikeListing = async (params: {
  id: number;
}): Promise<OperationResponse<Paths.ListingsDislikeCreate.Responses.$204>> => {
  const client = await getApiClient();
  return await client.listings_dislike_create({ id: params.id });
};
