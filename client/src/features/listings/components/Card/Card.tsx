import NEXT_ROUTES from '@/constants/routes';
import { formatPricePerUnit } from '@/utils/formatters';
import { uuid } from '@/utils/uuid';
import { TruckIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { FEATURES } from '../../types/features';
import { Listing } from '../../types/listings';
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
    <div
      className={clsx(
        'flex flex-col justify-between',
        !listing.is_active && 'opacity-80 grayscale-[80%]',
        className
      )}
    >
      <Link key={uuid()} href={NEXT_ROUTES.DETAILS_LISTING(listing.id)}>
        <div className="relative">
          {listing?.features.some(
            (f) => f.feature === FEATURES.ALLOWS_DELIVERY.name
          ) && (
            <TruckIcon className="absolute right-2 top-2 h-10 w-10 rounded-full border border-light-gray bg-white p-2" />
          )}
          <Image
            className="aspect-[5/4] rounded-lg object-cover"
            src={listing?.images[0]?.image}
            alt={listing?.title}
            width={250}
            height={300}
            unoptimized
          />
          {!listing.is_active && (
            <p className="absolute-center absolute rounded-full bg-light-red px-3 py-2 text-white opacity-80 outline outline-light-gray">
              DESACTIVADO
            </p>
          )}
        </div>
        <h3 className={clsx('truncate text-lg font-semibold', !mini && 'mt-1')}>
          {listing.title}
        </h3>
        {!mini && (
          <p lang="es" className="mb-1 line-clamp-3 hyphens-auto">
            {listing.description}
          </p>
        )}
      </Link>
      <span className="flex w-full justify-between">
        <span className="text-xl font-semibold">
          {formatPricePerUnit(listing.price_per_unit, listing.unit)}
        </span>
        <LikeButton listing={listing} />
      </span>
    </div>
  );
};
