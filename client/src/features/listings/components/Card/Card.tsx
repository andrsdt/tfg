import NEXT_ROUTES from '@/constants/routes';
import { formatMoney } from '@/utils/formatters';
import { uuid } from '@/utils/uuid';
import { TruckIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { FEATURES } from '../../types/features';
import { Listing } from '../../types/listings';
import { UNITS } from '../../types/units';
import { LikeButton } from '../Buttons/LikeButton';

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
          {listing?.features.some(
            (f) => f.feature === FEATURES.ALLOWS_DELIVERY.name
          ) && (
            <TruckIcon className="absolute right-2 top-2 h-10 w-10 rounded-full border border-light-gray bg-white p-2" />
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
          {formatMoney(listing.price_per_unit)}/
          {UNITS[listing.unit].translationShort}
        </span>
        <LikeButton listing={listing} />
      </span>
    </div>
  );
};
