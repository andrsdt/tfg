import { getApiClient } from '@/lib/api';

import { Paths } from '@/types/openapi';
import { OperationResponse } from 'openapi-client-axios';

export const retrieveProducer = async (
  id: string
): Promise<OperationResponse<Paths.ProducersRetrieve.Responses.$200>> => {
  const client = await getApiClient();
  return await client.producers_retrieve(id);
};
