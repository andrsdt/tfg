import { getApiClient } from '@/lib/api';

import { Paths } from '@/types/openapi';
import { OperationResponse } from 'openapi-client-axios';

export const retrieveOrder = async (
  id: string
): Promise<OperationResponse<Paths.OrdersRetrieve.Responses.$200>> => {
  const client = await getApiClient();
  return await client.orders_retrieve(id);
};
