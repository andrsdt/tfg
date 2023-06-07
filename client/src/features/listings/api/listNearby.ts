import { getApiClient } from '@/lib/api';

import { Paths } from '@/types/openapi';
import { OperationResponse } from 'openapi-client-axios';

export const listNearbyListings = async (): Promise<
  OperationResponse<Paths.ListingsList.Responses.$200>
> => {
  const client = await getApiClient();
  return await client.listings_list({
    order_by: '-updated_at' as any,
    distance_order: 'asc',
    distance: '5000', // meters
    // exclude_mine: true,
  });
};
