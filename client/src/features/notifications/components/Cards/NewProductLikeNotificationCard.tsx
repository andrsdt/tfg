import NEXT_ROUTES from '@/constants/routes';
import { Listing } from '@/features/listings/types/listings';
import { Notification } from '../../types/notifications';
import { GenericListingNotificationCard } from './GenericListingNotificationCard';
import { retrieveListing } from '@/features/listings/api/retrieve';
import { useRetrieveHandler } from '@/hooks/useRetrieveHandler';

type NewProductLikeNotificationCardProps = {
  notification: Notification;
};

export const NewProductLikeNotificationCard = ({
  notification,
}: NewProductLikeNotificationCardProps) => {
  const listingId = notification.data.listing as string;
  const [listing] = useRetrieveHandler<Listing, Listing>(() =>
    retrieveListing(listingId)
  );

  return (
    <GenericListingNotificationCard
      href={NEXT_ROUTES.DETAILS_LISTING(listingId)}
      listing={listing}
      notification={notification}
    >
      Alguien ha guardado en favoritos tu publicación de{' '}
      <b className="text-green">{listing?.title || ''}</b>
    </GenericListingNotificationCard>
  );
};
