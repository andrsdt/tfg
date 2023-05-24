import { getApiClient } from '@/lib/api';

import { Paths } from '@/types/openapi';
import { OperationResponse } from 'openapi-client-axios';

export const listRecentListings = async (): Promise<
  OperationResponse<Paths.ListingsList.Responses.$200>
> => {
  const client = await getApiClient();
  return await client.listings_list({
    order_by: '-created_at' as any,
    exclude_mine: true,
  });
};
