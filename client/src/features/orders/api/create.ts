import { getApiClient } from '@/lib/api';
import { MarkAsSoldValues } from '@/pages/listings/[id]/sell/[conversationId]';

import { Paths } from '@/types/openapi';
import { OperationResponse } from 'openapi-client-axios';

export const createOrder = async (
  data: MarkAsSoldValues
): Promise<OperationResponse<Paths.OrdersCreate.Responses.$201>> => {
  const client = await getApiClient();
  return await client.orders_create(undefined, {
    quantity: data.quantity,
    total_price: data.total_price,
    listing: data.listing_id,
    consumer: data.consumer_id,
  });
};
