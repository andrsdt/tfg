import { useAuth } from '@/hooks/useAuth';
import dayjs from '@/lib/dayjs';
import { useChatStore } from '@/stores/chats';
import { getOtherUser } from '@/utils/conversation';
import { formatDate } from '@/utils/formatters';
import { groupBy } from '@/utils/transformations';
import { Conversation, Message } from '../types/conversations';
import { MessageBubble } from './MessageBubble';

type MessageListProps = {
  conversation: Conversation;
};

export const MessageList = ({ conversation }: MessageListProps) => {
  const { user } = useAuth();
  const { messages } = useChatStore();

  const history = conversation.messages;
  const allMessages = [...history, ...messages];

  const messagesWithDates = groupBy(allMessages, (message) =>
    new Date(message.created_at).toLocaleDateString()
  );

  return (
    <div className="mb-12 flex flex-col-reverse space-y-3 space-y-reverse overflow-y-auto pb-12 pt-3">
      {Object.entries(messagesWithDates)
        ?.reverse()
        ?.map(([date, messages]: [string, Message[]]) => (
          <div key={date} className="flex flex-col space-y-3">
            <div className="text-center text-sm text-gray">
              {/* If it's this year -> 22 de mayo */}
              {/* If it's last year -> 14 de diciembre de 2022 */}
              {formatDate(date, dayjs(date).year() < dayjs().year())}
            </div>
            {messages?.map((message: Message) => (
              <MessageBubble
                key={message.id}
                message={message}
                otherUser={getOtherUser(conversation, user)}
                isMine={message.sender === user?.pk}
              />
            ))}
          </div>
        ))}
    </div>
  );
};
