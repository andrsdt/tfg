import { getApiClient } from '@/lib/api';

import { Paths } from '@/types/openapi';
import { OperationResponse } from 'openapi-client-axios';

export const deactivateListing = async (params: {
  id: string;
}): Promise<
  OperationResponse<Paths.ListingsDeactivateCreate.Responses.$204>
> => {
  const client = await getApiClient();
  return await client.listings_deactivate_create({
    id: Number.parseInt(params.id),
  });
};
