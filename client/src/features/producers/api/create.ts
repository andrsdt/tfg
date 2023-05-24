import { getApiClient } from '@/lib/api';

import { Paths } from '@/types/openapi';
import { OperationResponse } from 'openapi-client-axios';

export const becomeProducer = async (): Promise<
  OperationResponse<Paths.ProducersCreate.Responses.$201>
> => {
  const client = await getApiClient();
  return await client.producers_create();
};
