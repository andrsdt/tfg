import { Avatar } from '@/features/users/components/Avatar';
import { BasicUser } from '@/features/users/types/users';
import dayjs from '@/lib/dayjs';
import clsx from 'clsx';
import { Message } from '../types/conversations';
import { CheckMark, DoubleCheckMark } from './Checkmarks';
import { CollapsibleText } from '@/pages/producers/[id]';

type MessageBubbleProps = {
  message: Message;
  otherUser: BasicUser;
  isMine: boolean;
};

export const MessageBubble = ({
  message,
  otherUser,
  isMine,
}: MessageBubbleProps) => {
  // TODO: add the logic here to decide which component should render the message based on the MESSAGE_TYPE
  // What is currently in this component should be split in two components: GenericMessageBubble({children}) and TextMessage
  return (
    <div
      className={clsx(
        'flex w-full flex-col',
        isMine ? 'items-end' : 'items-start'
      )}
    >
      <span className="flex flex-row items-end space-x-2">
        {!isMine && <Avatar src={otherUser?.photo} className="h-8 w-8" />}
        <div
          className={clsx(
            'flex max-w-xs flex-row items-center justify-between break-all rounded-2xl px-3 py-2',
            isMine
              ? 'rounded-br-none bg-light-green'
              : 'rounded-bl-none bg-light-gray'
          )}
        >
          <CollapsibleText
            text={message.text}
            className="py-1 text-lg"
            collapsedClassName="line-clamp-6"
            readMoreThreshold={175}
          />
          {message.created_at && (
            <p className="ml-2 flex-none place-self-end pb-0.5 text-xs text-gray">
              {dayjs(message.created_at).format('HH:mm')}
            </p>
          )}
        </div>
        {isMine &&
          (message.read_by_recipient ? <DoubleCheckMark /> : <CheckMark />)}
      </span>
    </div>
  );
};
