import { getApiClient } from '@/lib/api';

import { Paths } from '@/types/openapi';
import { OperationResponse } from 'openapi-client-axios';
import { Target } from '../types/targets';

export type SendReportValues = {
  description: string;
  target: Target;
  reported?: number;
  order?: number;
};

export const sendReport = async (
  data: SendReportValues
): Promise<OperationResponse<Paths.ReportsCreate.Responses.$201>> => {
  const client = await getApiClient();
  return await client.reports_create(undefined, {
    description: data.description,
    reported: data.reported ?? undefined,
    order: data.order,
  });
};
