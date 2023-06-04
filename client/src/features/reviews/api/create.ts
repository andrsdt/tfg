import { ReviewListingValues } from '@/pages/my-purchases/[id]/rate';
import { getApiClient } from '@/lib/api';

import { Paths } from '@/types/openapi';
import { OperationResponse } from 'openapi-client-axios';

export const createReview = async (
  data: ReviewListingValues
): Promise<OperationResponse<Paths.ReviewsCreate.Responses.$201>> => {
  const client = await getApiClient();
  return await client.reviews_create(undefined, {
    rating: data.rating,
    comment: data.comment.length > 0 ? data.comment : undefined,
    order: data.order,
  });
};
