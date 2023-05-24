import { getApiClient } from '@/lib/api';

import { Paths } from '@/types/openapi';
import { OperationResponse } from 'openapi-client-axios';

export const likeListing = async (params: {
  id: number;
}): Promise<OperationResponse<Paths.ListingsLikeCreate.Responses.$204>> => {
  const client = await getApiClient();
  return await client.listings_like_create({ id: params.id });
};
