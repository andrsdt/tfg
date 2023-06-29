import { getApiClient } from '@/lib/api';

import { Components, Paths } from '@/types/openapi';
import { OperationResponse } from 'openapi-client-axios';

export type UpdateProducerValues = {
  biography: string;
};

export type UpdateProducerDTO = Components.Schemas.PatchedProducerRequest;

export const updateProducer = async (
  params: { id: number },
  data: UpdateProducerDTO
): Promise<OperationResponse<Paths.ProducersPartialUpdate.Responses.$200>> => {
  const client = await getApiClient();
  return await client.producers_partial_update(
    { user: params.id },
    {
      biography: data.biography,
    }
  );
};
