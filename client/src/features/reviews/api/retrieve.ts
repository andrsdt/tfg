import { getApiClient } from '@/lib/api';

import { Paths } from '@/types/openapi';
import { OperationResponse } from 'openapi-client-axios';

export const retrieveReview = async (
  id: string
): Promise<OperationResponse<Paths.ReviewsRetrieve.Responses.$200>> => {
  const client = await getApiClient();
  return await client.reviews_retrieve(id);
};
