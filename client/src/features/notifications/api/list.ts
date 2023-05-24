import { getApiClient } from '@/lib/api';

import useSWR from 'swr';
import { Notification } from '../types/notifications';

export const useListNotifications = () => {
  // Use SWR to cache the response and refresh it periodically
  const { data, isLoading, error } = useSWR(
    'notifications_list',
    async () => await (await getApiClient()).notifications_list()
  );

  const sanitizedResponse = (data?.data ?? data) as Notification[];

  return {
    notifications: sanitizedResponse,
    isLoading,
    isError: error,
  };
};
