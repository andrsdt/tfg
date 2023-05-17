import { Button, FixedDrawer, Separator } from '@/components/Elements';
import { UserCard } from '@/features/users/components/Card';
import { formatMoney } from '@/utils/formatters';
import { Listing } from '../../types/listings';
import { UNITS } from '../../types/units';

type ListingDetailsDrawerProps = {
  listing: Listing;
};

export const ListingDetailsDrawer = ({
  listing,
}: ListingDetailsDrawerProps) => {
  const unit = UNITS[listing.unit].translationShort;
  const unitPlural = UNITS[listing.unit].translationShortPlural;
  const hasOneUnit = listing.available_quantity === 1;

  return (
    <FixedDrawer className=" bg-white p-4">
      <UserCard user={listing.producer.user} />
      <Separator />
      <span className="grid grid-cols-3">
        {/* TODO: replace the raw enum with a prettify form (using the UNITS constant and translation like in allergens) */}
        <Entry
          title={`Precio (por ${unit})`}
          value={formatMoney(listing.price_per_unit)}
        />
        <Entry
          title="Stock disponible"
          value={`${listing.available_quantity} ${
            hasOneUnit ? unit : unitPlural
          }`}
        />
        <Button className="-ml-3 text-center font-semibold">COMPRAR</Button>
      </span>
    </FixedDrawer>
  );
};

const Entry = ({ title, value }: { title: string; value: string }) => (
  <span className="flex flex-col items-start">
    <p className="text-md">{title}</p>
    <p className="text-xl font-semibold">{value}</p>
  </span>
);
