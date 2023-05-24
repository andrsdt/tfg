import Link from 'next/link';
import { ConversationPreview } from '../types/conversations';
import { ConversationListItem } from './ConversationListItem';
import NEXT_ROUTES from '@/constants/routes';

type ConversationListParams = {
  conversations: ConversationPreview[];
};

export const ConversationList = ({ conversations }: ConversationListParams) => (
  <div className="flex flex-col space-y-6 py-3">
    {conversations?.map((conversation: ConversationPreview) => (
      <Link key={conversation.id} href={NEXT_ROUTES.CHAT(conversation.id)}>
        <ConversationListItem conversation={conversation} />
      </Link>
    ))}
  </div>
);
