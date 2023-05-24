import { getApiClient } from '@/lib/api';
import useSWR from 'swr';

import { ConversationPreview } from '../types/conversations';

export const useListConversations = () => {
  // Use SWR to cache the response and refresh it periodically
  const { data, isLoading, error } = useSWR(
    'chats_list',
    async () => await (await getApiClient()).chats_list()
  );

  const sanitizedResponse = (data?.data ?? data) as ConversationPreview[];

  return {
    conversations: sanitizedResponse,
    isLoading,
    isError: error,
  };
};
