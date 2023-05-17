import { BaseLayout } from '@/components/Layouts';
import { useSearchListings } from '@/features/listings/api/search';
import { ListingCard } from '@/features/listings/components/Card/Card';
import { SearchHeader } from '@/features/listings/components/Search/SearchHeader';

// https://cgarethc.medium.com/using-react-router-searchparams-to-manage-filter-state-for-a-list-e515e8e50166
const Search = () => {
  const [listings] = useSearchListings();

  return (
    <BaseLayout>
      <div className="h-full bg-light-gray">
        <SearchHeader numberOfListings={listings?.length} />
        <div className="mt-3 grid grid-cols-2 gap-x-3 gap-y-5 px-4">
          {listings?.map((listing) => (
            <ListingCard
              key={listing.id}
              listing={listing}
              className="rounded-2xl bg-white p-3"
            />
          ))}
        </div>
      </div>
    </BaseLayout>
  );
};

export default Search;
