import { LayoutWithNavbar } from '@/components/Layouts';
import { ROLES } from '@/constants/roles';
import { listFavoriteListings } from '@/features/listings/api/listFavorite';
import { ListingCard } from '@/features/listings/components/Card/Card';
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
      <h1 className="mb-2 text-3xl font-bold tracking-tight">Tus favoritos</h1>
      <div className="grid grid-cols-2 gap-x-3 gap-y-5">
        {favoriteListings?.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>
    </LayoutWithNavbar>
  );
};

export default Favorites;
