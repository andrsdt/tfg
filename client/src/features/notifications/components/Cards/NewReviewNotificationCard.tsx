import NEXT_ROUTES from '@/constants/routes';
import { retrieveReview } from '@/features/reviews/api/retrieve';
import { Review } from '@/features/reviews/types/reviews';
import { useRetrieveHandler } from '@/hooks/useRetrieveHandler';
import { Notification } from '../../types/notifications';
import { GenericListingWithUserNotificationCard } from './GenericListingWithUserNotificationCard';

type NewReviewNotificationCardProps = {
  notification: Notification;
};

export const NewReviewNotificationCard = ({
  notification,
}: NewReviewNotificationCardProps) => {
  const reviewId = notification.data.review;

  const [review] = useRetrieveHandler<Review, Review>(() =>
    retrieveReview(reviewId)
  );

  // TODO: notification skeleton
  if (!review) return <></>;

  return (
    <GenericListingWithUserNotificationCard
      href={NEXT_ROUTES.PRODUCER_REVIEWS(review.order.listing.producer.user.id)}
      listing={review.order.listing}
      user={review.order.consumer}
      notification={notification}
    >
      <b className="text-green">{review.order.consumer.first_name}</b> te ha
      dejado una reseña por su compra de{' '}
      <b className="text-green">{review.order.listing.title}</b>
    </GenericListingWithUserNotificationCard>
  );
};
