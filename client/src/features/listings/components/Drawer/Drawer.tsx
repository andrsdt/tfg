import { FixedDrawer, Button, Separator } from '@/components/Elements';
import { UserCard } from '@/features/users/components/Card';
import { formatMoney } from '@/utils/formatters';
import { Listing } from '../../types/listings';

type ListingDetailsDrawerProps = {
  listing: Listing;
};

export const ListingDetailsDrawer = ({
  listing,
}: ListingDetailsDrawerProps) => {
  return (
    <FixedDrawer className=" bg-white p-4">
      <UserCard user={listing.producer.user} />
      <Separator />
      <span className="grid grid-cols-3">
        {/* TODO: replace this "Precio total" with something else */}
        <Entry
          title={`Precio (por ${listing.unit})w`}
          value={formatMoney(listing.price_per_unit)}
        />
        <Entry
          title="Stock disponible"
          value={`${listing.available_quantity} ${listing.unit}`}
        />
        <Button className="-ml-3 text-center font-semibold">COMPRAR</Button>
      </span>
    </FixedDrawer>
  );
};

const Entry = ({ title, value }: { title: string; value: string }) => (
  <span className="flex flex-col items-start">
    <p className="text-xl text-black">{title}</p>
    <p className="text-2xl font-semibold text-black">{value}</p>
  </span>
);
