import NEXT_ROUTES from '@/constants/routes';
import { retrieveOrder } from '@/features/orders/api/retrieve';
import { Order } from '@/features/orders/types/orders';
import { useRetrieveHandler } from '@/hooks/useRetrieveHandler';
import { Notification } from '../../types/notifications';
import { GenericListingNotificationCard } from './GenericListingNotificationCard';

type ReviewOrderNotificationCardProps = {
  notification: Notification;
};

export const ReviewOrderNotificationCard = ({
  notification,
}: ReviewOrderNotificationCardProps) => {
  const orderId = notification.data.order as string;
  const [order] = useRetrieveHandler<Order, Order>(() =>
    retrieveOrder(orderId)
  );

  return (
    <GenericListingNotificationCard
      href={NEXT_ROUTES.RATE_ORDER(orderId)}
      listing={order?.listing}
      notification={notification}
    >
      No olvides dejar una reseña en tu compra de{' '}
      <b className="text-green">{order?.listing?.title || ''}</b>
    </GenericListingNotificationCard>
  );
};
