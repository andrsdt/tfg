import NEXT_ROUTES from '@/constants/routes';
import { retrieveUser } from '@/features/users/api/retrieve';
import { useRetrieveHandler } from '@/hooks/useRetrieveHandler';
import { Notification } from '../../types/notifications';
import { GenericUserNotificationCard } from './GenericUserNotificationCard';
import { BasicUser } from '@/features/users/types/users';

type NewChatMessageNotificationCardProps = {
  notification: Notification;
};

export const NewChatMessageNotificationCard = ({
  notification,
}: NewChatMessageNotificationCardProps) => {
  const senderId = notification.data.sender;
  const conversationId = notification.data.conversation;

  const [sender] = useRetrieveHandler<BasicUser, BasicUser>(() =>
    retrieveUser(senderId)
  );

  return (
    <GenericUserNotificationCard
      href={NEXT_ROUTES.CHAT(conversationId)}
      user={sender}
      notification={notification}
    >
      <b className="text-green">
        {sender?.first_name} {sender?.last_name}
      </b>{' '}
      te ha enviado un mensaje
    </GenericUserNotificationCard>
  );
};
