import { getApiClient } from '@/lib/api';

import { Paths } from '@/types/openapi';
import { OperationResponse } from 'openapi-client-axios';

// List all the conversations about a specific listing. We use this
// when a producer wants to mark a product as sold, and he is shown
// a suggestions of users who he may have sold the product to.
export const listConversationsFromListing = async (
  id: string
): Promise<OperationResponse<Paths.ChatsList.Responses.$200>> => {
  if (!id) return;

  const client = await getApiClient();
  return await client.chats_list({
    listing: id,
  });
};
