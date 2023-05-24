import { BaseLayout } from '@/components/Layouts';
import { useSearchListings } from '@/features/listings/api/search';
import { ListingTwoColumnsList } from '@/features/listings/components/Lists/ListingsTwoColumnsList';
import { SearchHeader } from '@/features/listings/components/Search/SearchHeader';

// https://cgarethc.medium.com/using-react-router-searchparams-to-manage-filter-state-for-a-list-e515e8e50166
const Search = () => {
  const [listings] = useSearchListings();

  return (
    <BaseLayout>
      <div className="h-full">
        <SearchHeader numberOfListings={listings?.length} />
        <div className="p-4">
          <ListingTwoColumnsList listings={listings} listingClassName="" />
        </div>
      </div>
    </BaseLayout>
  );
};

export default Search;
