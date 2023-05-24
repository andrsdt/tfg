import { CloseButton } from '@/components/Elements';
import { BaseLayout } from '@/components/Layouts';
import { ROLES } from '@/constants/roles';
import { listRecentListingsByProducer } from '@/features/listings/api/listRecentByProducer';
import { ListingTwoColumnsList } from '@/features/listings/components/Lists/ListingsTwoColumnsList';
import { Listing } from '@/features/listings/types/listings';
import { useAuth } from '@/hooks/useAuth';
import { useRetrieveHandler } from '@/hooks/useRetrieveHandler';

const MyListings = () => {
  const { user } = useAuth({ roles: [ROLES.PRODUCER] });
  const [myListings] = useRetrieveHandler<Listing[], Listing[]>(
    () => listRecentListingsByProducer(user?.pk.toString()),
    {
      fetchOnChange: [user?.pk],
    }
  );

  return (
    <BaseLayout className="p-4">
      <span className="mb-4 flex h-min justify-between">
        <h1 className="text-3xl font-bold">Tus publicaciones</h1>
        <CloseButton />
      </span>
      <ListingTwoColumnsList listings={myListings} />
    </BaseLayout>
  );
};

export default MyListings;
