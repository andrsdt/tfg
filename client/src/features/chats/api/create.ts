import { getApiClient } from '@/lib/api';

import { Paths } from '@/types/openapi';
import { OperationResponse } from 'openapi-client-axios';

export const createChat = async (
  id: number
): Promise<OperationResponse<Paths.ChatsCreate.Responses.$201>> => {
  const client = await getApiClient();
  return await client.chats_create(undefined, {
    listing: id,
  });
};
