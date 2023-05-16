import NEXT_ROUTES from '@/constants/routes';
import { formatMoney } from '@/utils/formatters';
import { TruckIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import Link from 'next/link';
import { LikeButton } from '../Buttons/LikeButton';
import clsx from 'clsx';
import { uuid } from '@/utils/uuid';
import { Listing } from '../../types/listings';

type ListingCardProps = {
  listing: Listing;
  mini?: boolean;
  className?: string;
};

export const ListingCard = ({
  listing,
  mini = false,
  className = '',
}: ListingCardProps) => {
  return (
    <div className={clsx('flex flex-col justify-between', className)}>
      <Link key={uuid()} href={NEXT_ROUTES.DETAILS_LISTING(listing.id)}>
        <div className="relative">
          {listing?.features.includes({ feature: 'ALLOWS_DELIVERY' }) && (
            <TruckIcon className="absolute right-2 top-2 h-8 w-8 rounded-full bg-white p-2 text-black" />
          )}
          <Image
            className="aspect-[5/4] rounded-lg object-cover"
            src={listing?.images[0].image}
            alt={listing?.title}
            width={250}
            height={300}
          />
        </div>
        <h3 className={clsx('truncate text-lg font-semibold', !mini && 'mt-1')}>
          {listing.title}
        </h3>
        {!mini && <p className="mb-1 line-clamp-3">{listing.description}</p>}
      </Link>
      <span className="flex w-full justify-between">
        <span className="text-xl font-semibold">
          {formatMoney(listing.price_per_unit)}/{listing.unit}
        </span>
        <LikeButton listing={listing} />
      </span>
    </div>
  );
};
