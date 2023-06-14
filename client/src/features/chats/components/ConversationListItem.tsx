import { Avatar } from '@/features/users/components/Avatar';
import { useAuth } from '@/hooks/useAuth';
import { getOtherUser } from '@/utils/conversation';
import { shortenName } from '@/utils/formatters';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { ConversationPreview } from '../types/conversations';
import { CheckMark, DoubleCheckMark } from './Checkmarks';

type ConversationListItemProps = {
  conversation: ConversationPreview;
  mini?: boolean;
  className?: string;
};

export const ConversationListItem = ({
  conversation,
  mini = false,
  className,
}: ConversationListItemProps) => {
  const { last_message, unread_messages_count } = conversation;
  const hasUnreadMessages = unread_messages_count > 0;

  // Get who is the user who i'm chatting with (the one we want to display)
  const { user } = useAuth();
  const otherUser = getOtherUser(conversation, user);
  const lastMessageWasMine = last_message?.sender === user?.pk;

  if (!otherUser) return <></>;
  return (
    <div className={clsx('flex w-full justify-between space-x-3', className)}>
      <span className="flex w-5/6 space-x-3">
        <Avatar className="h-16 w-16" src={otherUser.photo} />
        <div
          className={clsx(
            {
              'font-semibold text-black':
                last_message &&
                !last_message.read_by_recipient &&
                !lastMessageWasMine,
            },
            'flex flex-col truncate leading-3'
          )}
        >
          <p className="truncate text-xl font-semibold">
            {shortenName(otherUser.first_name, otherUser.last_name)}
          </p>
          <p className="truncate text-lg">
            {`${lastMessageWasMine ? 'Yo:' : ''} ${
              last_message?.text || 'Todavía no hay mensajes'
            }`}
          </p>
        </div>
      </span>

      {last_message && !mini && (
        <div
          className={clsx(
            'flex flex-col items-end text-gray',
            hasUnreadMessages && 'font-bold'
          )}
        >
          {dayjs(last_message.created_at).format('HH:mm')}
          {!lastMessageWasMine && hasUnreadMessages && (
            <span className="flex aspect-square w-8 items-center justify-center rounded-full bg-light-red text-center font-semibold text-white">
              {unread_messages_count}
            </span>
          )}
          {lastMessageWasMine &&
            (last_message.read_by_recipient ? (
              <DoubleCheckMark />
            ) : (
              <CheckMark />
            ))}
        </div>
      )}
    </div>
  );
};
