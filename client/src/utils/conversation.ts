import {
  Conversation,
  ConversationPreview,
} from '@/features/chats/types/conversations';
import { AuthenticatedUser } from '@/features/users/types/users';

export const getOtherUser = (
  conversation: Conversation | ConversationPreview,
  me: AuthenticatedUser
) => {
  if (!me || !conversation) return undefined;
  return me.pk === conversation.producer.id
    ? conversation.consumer
    : conversation.producer;
};
