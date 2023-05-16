import { api } from '@/lib/api';

import { Client, Paths } from '@/types/openapi';
import { OperationResponse } from 'openapi-client-axios';

export const retrieveProducer = async (
  id: string
): Promise<OperationResponse<Paths.ProducersRetrieve.Responses.$200>> => {
  const client = await api.getClient<Client>();
  return await client.producers_retrieve(id);
};
