import { getApiClient } from '@/lib/api';

import { Paths } from '@/types/openapi';
import { OperationResponse } from 'openapi-client-axios';

export const listRecentListingsByProducer = async (
  id: string
): Promise<OperationResponse<Paths.ListingsList.Responses.$200>> => {
  if (!id) return;

  const client = await getApiClient();
  return await client.listings_list({
    order_by: '-updated_at' as any,
    producer: id,
  });
};
