import { useAuth } from '@/hooks/useAuth';
import { getApiClient } from '@/lib/api';

import { Components } from '@/types/openapi';
import useSWR from 'swr';

export const useCountUnreadNotifications = () => {
  // Use SWR to cache the response and refresh it periodically
  const { user } = useAuth();
  const { data, isLoading, error } = useSWR(
    user && 'count_unread_notifications',
    async () => await (await getApiClient()).notifications_count_retrieve()
  );

  const sanitizedResponse = (data?.data ?? data) as Components.Schemas.Count;

  return {
    numNotifications: sanitizedResponse?.count,
    isLoading,
    isError: error,
  };
};
