import { getApiClient } from '@/lib/api';

import { Paths } from '@/types/openapi';
import { OperationResponse } from 'openapi-client-axios';

export const listReviews = async (
  producer_id: string
): Promise<OperationResponse<Paths.ReviewsList.Responses.$200>> => {
  const client = await getApiClient();
  return await client.reviews_list({ producer: producer_id });
};
