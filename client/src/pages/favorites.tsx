import { LayoutWithNavbar } from '@/components/Layouts';
import { ROLES } from '@/constants/roles';
import { listFavoriteListings } from '@/features/listings/api/listFavorite';
import { ListingTwoColumnsList } from '@/features/listings/components/Lists/ListingsTwoColumnsList';
import { Listing } from '@/features/listings/types/listings';
import { useAuth } from '@/hooks/useAuth';
import { useRetrieveHandler } from '@/hooks/useRetrieveHandler';

const Favorites = () => {
  useAuth({ roles: [ROLES.AUTHENTICATED] });

  const [favoriteListings] = useRetrieveHandler<Listing[], Listing[]>(
    listFavoriteListings
  );

  return (
    <LayoutWithNavbar className="p-4">
      <ListingTwoColumnsList listings={favoriteListings} />
    </LayoutWithNavbar>
  );
};

export default Favorites;
