import { BasicListing } from '@/features/listings/types/listings';
import { Avatar } from '@/features/users/components/Avatar';
import { BasicUser } from '@/features/users/types/users';
import dayjs from '@/lib/dayjs';
import { capitalize } from '@/utils/formatters';
import Image from 'next/image';
import { Notification } from '../../types/notifications';
import { UnreadIndicator } from '../UnreadIndicator';
import { GenericNotificationCard } from './GenericNotificationCard';

type GenericListingWithUserNotificationCardProps = {
  href?: string;
  listing: BasicListing | undefined;
  user: BasicUser | undefined;
  notification: Notification;
  children: React.ReactNode;
};

export const GenericListingWithUserNotificationCard = ({
  href,
  listing,
  user,
  notification,
  children,
}: GenericListingWithUserNotificationCardProps) => {
  return (
    <GenericNotificationCard className="relative flex" href={href}>
      {!notification.is_read && <UnreadIndicator />}
      <>
        <Avatar
          src={user?.photo}
          className="outine absolute left-0 top-0 h-8 w-8 outline-8 outline-white"
        />
        <Image
          src={listing?.images[0].image ?? '/placeholders/image.jpg'}
          alt={listing?.title ?? 'Imagen del producto'}
          width={80}
          height={80}
          className="mr-4 h-20 w-20 rounded-xl object-cover"
        />
      </>
      <div className="flex flex-col justify-between py-1">
        {/* TODO: break-all after line-clamp? */}
        <p className="line-clamp-2 text-lg leading-5">{children}</p>
        {/* TODO: use <date/> instead of <p/> */}
        <p className="text-sm text-gray">
          {capitalize(dayjs(notification.updated_at).fromNow())}
        </p>
      </div>
    </GenericNotificationCard>
  );
};
