import { getApiClient } from '@/lib/api';

import useSWR from 'swr';
import { Producer } from '../types/producers';

export const useRetrieveProducer = (id: string) => {
  const { data, isLoading, error } = useSWR(
    'producer_retrieve',
    async () => id && (await (await getApiClient()).producers_retrieve(id))
  );

  const sanitizedResponse = (data?.data ?? data) as Producer;

  return {
    producer: sanitizedResponse,
    isLoading,
    isError: error,
  };
};
