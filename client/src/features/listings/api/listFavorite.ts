import { api } from '@/lib/api';

import { Client, Paths } from '@/types/openapi';
import { OperationResponse } from 'openapi-client-axios';

export const listFavoriteListings = async (): Promise<
  OperationResponse<Paths.ListingsList.Responses.$200>
> => {
  const client = await api.getClient<Client>();
  return await client.listings_list({
    order_by: '-updated_at' as any,
    favorite: true,
  });
};
