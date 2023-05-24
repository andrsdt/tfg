import NEXT_ROUTES from '@/constants/routes';
import { Stars } from '@/features/reviews/components/Stars';
import { Review } from '@/features/reviews/types/reviews';
import { Avatar } from '@/features/users/components/Avatar';
import { formatShortDate, shortenName } from '@/utils/formatters';
import Image from 'next/image';
import Link from 'next/link';

type ReviewCardProps = { review: Review };

export const ReviewCard = ({ review }: ReviewCardProps) => {
  const listing = review.order.listing;
  const reviewer = review.order.consumer;
  // TODO: const isAnonymousReview -> when there is no reviewer in the serializer (nullable field)
  return (
    <div className="flex space-x-2">
      <Link
        href={NEXT_ROUTES.DETAILS_LISTING(listing.id)}
        className="relative w-1/4"
      >
        <Avatar
          src={reviewer.photo}
          className="absolute -left-2 -top-2 h-8 w-8 outline outline-4 outline-white"
        />
        <Image
          src={listing.images[0].image}
          alt="Imagen del producto"
          width={80}
          height={65}
          className="aspect-[5/4] rounded-lg object-cover"
        />
      </Link>
      <div className="w-full truncate">
        <span className="mb-2 flex w-full justify-between space-x-1">
          <h1 className=" shrink truncate text-2xl font-semibold">
            {listing.title}
          </h1>
          <Stars
            className="justify-end space-x-0.5"
            starSize={20}
            value={review.rating}
          />
        </span>
        <p className="mb-2 truncate text-gray">
          {reviewer
            ? shortenName(reviewer.first_name, reviewer.last_name)
            : 'Usuario anónimo'}{' '}
          &middot; {formatShortDate(review.created_at)}
        </p>
        <p className="whitespace-pre-wrap text-black">{review.comment}</p>
      </div>
    </div>
  );
};
