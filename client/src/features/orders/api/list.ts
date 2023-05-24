import { getApiClient } from '@/lib/api';

import { Paths } from '@/types/openapi';
import { OperationResponse } from 'openapi-client-axios';

type ListOrdersProps = {
  role: Paths.OrdersList.Parameters.Role;
};

export const listOrders = async ({
  role,
}: ListOrdersProps): Promise<
  OperationResponse<Paths.OrdersList.Responses.$200>
> => {
  const client = await getApiClient();
  return await client.orders_list({ role });
};
