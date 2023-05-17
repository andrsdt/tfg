import { api } from '@/lib/api';

import { Client, Paths } from '@/types/openapi';
import { OperationResponse } from 'openapi-client-axios';

export const becomeProducer = async (): Promise<
  OperationResponse<Paths.ProducersCreate.Responses.$201>
> => {
  const client = await api.getClient<Client>();
  return await client.producers_create();
};
