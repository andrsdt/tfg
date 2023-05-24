import clsx from 'clsx';
import { Listing } from '../../types/listings';
import { ListingCard } from '../Card/Card';

type ListingTwoColumnsListProps = {
  listings: Listing[];
  listingClassName?: string;
};

export const ListingTwoColumnsList = ({
  listings,
  listingClassName,
}: ListingTwoColumnsListProps) => {
  return (
    <div className="grid grid-cols-2 gap-x-3 gap-y-5">
      {listings?.map((listing: Listing) => (
        <ListingCard
          key={listing.id}
          listing={listing}
          className={clsx(listingClassName)}
        />
      ))}
    </div>
  );
};
