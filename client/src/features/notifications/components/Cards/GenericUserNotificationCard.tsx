import Avatar from '@/features/users/components/Avatar/Avatar';
import { User } from '@/features/users/types/users';
import dayjs from '@/lib/dayjs';
import { capitalize } from '@/utils/formatters';
import { Notification } from '../../types/notifications';
import { GenericNotificationCard } from './GenericNotificationCard';

type GenericUserNotificationCardProps = {
  user?: User;
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
    <GenericNotificationCard className="flex space-x-4" href={href}>
      <Avatar src={user?.photo} className="h-20 w-20" />
      <div className="flex flex-col justify-between py-1">
        <p className="line-clamp-2 text-lg leading-5">{children}</p>
        <p className="text-sm text-gray">
          {capitalize(dayjs(notification.updated_at).fromNow())}
        </p>
      </div>
    </GenericNotificationCard>
  );
};
