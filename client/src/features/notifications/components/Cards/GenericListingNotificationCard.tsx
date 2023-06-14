import { BasicListing } from '@/features/listings/types/listings';
import dayjs from '@/lib/dayjs';
import { capitalize } from '@/utils/formatters';
import Image from 'next/image';
import { Notification } from '../../types/notifications';
import { UnreadIndicator } from '../UnreadIndicator';
import { GenericNotificationCard } from './GenericNotificationCard';

type GenericListingNotificationCardProps = {
  href?: string;
  listing: BasicListing | undefined;
  notification: Notification;
  children: React.ReactNode;
};

export const GenericListingNotificationCard = ({
  href,
  listing,
  notification,
  children,
}: GenericListingNotificationCardProps) => {
  return (
    <GenericNotificationCard className="flex" href={href}>
      {!notification.is_read && <UnreadIndicator />}
      <Image
        src={listing?.images[0].image ?? '/placeholders/image.jpg'}
        alt={listing?.title ?? 'Imagen del producto'}
        width={80}
        height={80}
        className="mr-4 h-20 w-20 rounded-xl object-cover"
      />
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
