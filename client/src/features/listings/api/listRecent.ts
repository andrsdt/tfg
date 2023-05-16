import { api } from '@/lib/api';

import { Client, Paths } from '@/types/openapi';
import { OperationResponse } from 'openapi-client-axios';

export const listRecentListings = async (): Promise<
  OperationResponse<Paths.ListingsList.Responses.$200>
> => {
  const client = await api.getClient<Client>();
  return await client.listings_list();
};
