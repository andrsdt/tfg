import { api } from '@/lib/api';

import { Client, Paths } from '@/types/openapi';
import { OperationResponse } from 'openapi-client-axios';

export const listNearbyListings = async (): Promise<
  OperationResponse<Paths.ListingsList.Responses.$200>
> => {
  const client = await api.getClient<Client>();
  // TODO: implement nearby listings endpoint
  return await client.listings_list();
};
