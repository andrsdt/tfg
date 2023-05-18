import { api } from '@/lib/api';

import { Client, Paths } from '@/types/openapi';
import { OperationResponse } from 'openapi-client-axios';

export const listNotifications = async (): Promise<
  OperationResponse<Paths.NotificationsList.Responses.$200>
> => {
  const client = await api.getClient<Client>();
  return await client.notifications_list();
};
