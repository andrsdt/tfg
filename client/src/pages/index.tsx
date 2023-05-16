import { NotificationsButton } from '@/components/Elements';
import { LayoutWithNavbar } from '@/components/Layouts';
import { listNearbyListings } from '@/features/listings/api/listNearby';
import { listRecentListings } from '@/features/listings/api/listRecent';
import { ListingCard } from '@/features/listings/components/Card/Card';
import { ListingHorizontalCarousel } from '@/features/listings/components/Carousel';
import { ListingSearchBar } from '@/features/listings/components/Search/SearchBar';
import { useRetrieveHandler } from '@/hooks/useRetreiveHandler';
import { uuid } from '@/utils/uuid';

// TODO: make this optional in such a way it does not mess with types in response
const transform = async (res) => await res;
const Home = () => {
  const [recentListings, isLoading, isError] = useRetrieveHandler(
    () => listRecentListings(),
    { transform }
  );
  const [nearbyListings, isLoadingNearby, isErrorNearby] = useRetrieveHandler(
    () => listNearbyListings(),
    { transform }
  );

  return (
    <LayoutWithNavbar className="p-6">
      <span className="flex items-center justify-between space-x-4">
        <ListingSearchBar />
        <NotificationsButton />
      </span>
      <h2 className="mb-1 mt-3 text-2xl font-bold tracking-tight text-black">
        Últimas novedades
      </h2>
      <ListingHorizontalCarousel listings={recentListings} />
      <h2 className="mb-1 mt-3 text-2xl font-bold tracking-tight text-black">
        Cerca de tí
      </h2>
      <div className="grid grid-cols-2 gap-x-3 gap-y-5">
        {nearbyListings?.map((listing) => (
          <ListingCard key={uuid()} listing={listing} />
        ))}
      </div>
    </LayoutWithNavbar>
  );
};

export default Home;
