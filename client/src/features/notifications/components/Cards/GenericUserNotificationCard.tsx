import { Avatar } from '@/features/users/components/Avatar';
import { BasicUser, User } from '@/features/users/types/users';
import dayjs from '@/lib/dayjs';
import { capitalize } from '@/utils/formatters';
import { Notification } from '../../types/notifications';
import { GenericNotificationCard } from './GenericNotificationCard';
import { UnreadIndicator } from '../UnreadIndicator';

type GenericUserNotificationCardProps = {
  user?: BasicUser | User;
  href: string;
  notification: Notification;
  children: React.ReactNode;
};

export const GenericUserNotificationCard = ({
  user,
  href,
  notification,
  children,
}: GenericUserNotificationCardProps) => {
  return (
    <GenericNotificationCard className="flex" href={href}>
      {!notification.is_read && <UnreadIndicator />}
      <Avatar src={user?.photo} className="mr-4 h-20 w-20" />
      <div className="flex flex-col justify-between py-1">
        {/* TODO: break-all after line-clamp? */}
        <p className="line-clamp-2 text-lg leading-5">{children}</p>
        <p className="text-sm text-gray">
          {capitalize(dayjs(notification.updated_at).fromNow())}
        </p>
      </div>
    </GenericNotificationCard>
  );
};
