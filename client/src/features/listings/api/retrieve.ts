import { getApiClient } from '@/lib/api';

import { Paths } from '@/types/openapi';
import { OperationResponse } from 'openapi-client-axios';

export const retrieveListing = async (
  id: string
): Promise<OperationResponse<Paths.ListingsRetrieve.Responses.$200>> => {
  const client = await getApiClient();
  return await client.listings_retrieve(id);
};
