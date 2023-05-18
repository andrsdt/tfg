import { Listing } from '@/features/listings/types/listings';
import dayjs from '@/lib/dayjs';
import { capitalize } from '@/utils/formatters';
import { Notification } from '../../types/notifications';
import { GenericNotificationCard } from './GenericNotificationCard';
import Image from 'next/image';

type GenericListingNotificationCardProps = {
  href?: string;
  listing: Listing | undefined;
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
    <GenericNotificationCard className="flex space-x-5" href={href}>
      <Image
        src={listing?.images[0].image ?? '/placeholders/image.jpg'}
        alt={listing?.title}
        width={80}
        height={80}
        className="h-20 w-20 rounded-xl object-cover"
      />
      <div className="flex flex-col justify-between py-1">
        <p className="line-clamp-2 text-lg leading-5">{children}</p>
        <p className="text-sm text-gray">
          {capitalize(dayjs(notification.updated_at).fromNow())}
        </p>
      </div>
    </GenericNotificationCard>
  );
};
