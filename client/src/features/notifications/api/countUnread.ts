import { api } from '@/lib/api';

import { Client, Paths } from '@/types/openapi';
import { OperationResponse } from 'openapi-client-axios';

export const countUnreadNotifications = async (): Promise<
  OperationResponse<Paths.NotificationsCountRetrieve.Responses.$200>
> => {
  // TODO: use SWR to fetch periodically
  const client = await api.getClient<Client>();
  return await client.notifications_count_retrieve();
};
