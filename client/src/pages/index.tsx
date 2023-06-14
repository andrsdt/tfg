import { LayoutWithNavbar } from '@/components/Layouts';
import { useListNearbyListings } from '@/features/listings/api/listNearby';
import { listRecentListings } from '@/features/listings/api/listRecent';
import { ListingHorizontalCarousel } from '@/features/listings/components/Carousel';
import { ListingTwoColumnsList } from '@/features/listings/components/Lists/ListingsTwoColumnsList';
import { ListingSearchBar } from '@/features/listings/components/Search/SearchBar';
import { Listing } from '@/features/listings/types/listings';
import { NotificationsButton } from '@/features/notifications/components';
import { useRetrieveHandler } from '@/hooks/useRetrieveHandler';

const Home = () => {
  const [recentListings] = useRetrieveHandler<Listing[], Listing[]>(
    listRecentListings
  );
  const { nearbyListings } = useListNearbyListings();

  return (
    <LayoutWithNavbar className="p-6">
      <span className="flex items-center justify-between space-x-4">
        <ListingSearchBar />
        <NotificationsButton />
      </span>
      <h2 className="mb-1 mt-3 text-2xl font-bold tracking-tight">
        Últimas novedades
      </h2>
      <ListingHorizontalCarousel listings={recentListings} />
      <h2 className="mb-1 mt-3 text-2xl font-bold tracking-tight">
        Cerca de tí
      </h2>
      <ListingTwoColumnsList listings={nearbyListings} />
    </LayoutWithNavbar>
  );
};

export default Home;
