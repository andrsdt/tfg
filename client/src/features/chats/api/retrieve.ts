import { getApiClient } from '@/lib/api';

import { Paths } from '@/types/openapi';
import { OperationResponse } from 'openapi-client-axios';

export const retrieveConversation = async (
  id: string
): Promise<OperationResponse<Paths.ChatsRetrieve.Responses.$200>> => {
  const client = await getApiClient();
  return await client.chats_retrieve(id);
};
