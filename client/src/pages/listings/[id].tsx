import { Separator } from '@/components/Elements';
import { BubbleBackButton } from '@/components/Elements/Button';
import { BaseLayout } from '@/components/Layouts';
import Map from '@/components/Map/Map';
import { retrieveListing } from '@/features/listings/api/retrieve';
import { MutableCarousel } from '@/features/listings/components/Carousel';
import { ListingDetailsDrawer } from '@/features/listings/components/Drawer';
import { ListingOptionsDropdown } from '@/features/listings/components/Dropdown/OptionsDropdown';
import { AllergenList } from '@/features/listings/components/Lists';
import { FeatureList } from '@/features/listings/components/Lists/Features';
import { useRetrieveHandler } from '@/hooks/useRetrieveHandler';
import dayjs from '@/lib/dayjs';
import { capitalize, transformLocationToCoordinates } from '@/utils/formatters';
import { Point } from 'geojson';
import { Listing as TListing } from '@/features/listings/types/listings';

export const getServerSideProps = async (context) => {
  const { id } = context.params;
  return {
    props: {
      id,
    },
  };
};

type ListingProps = {
  pageProps: {
    id: string;
  };
};

const Listing = ({ pageProps }: ListingProps) => {
  const { id } = pageProps;
  const [listing, isLoading, isError] = useRetrieveHandler<TListing, TListing>(
    () => retrieveListing(id)
  );

  if (!listing || isLoading || isError) return <></>;

  return (
    <BaseLayout className="flex flex-col justify-between">
      <BubbleBackButton />
      <div className="bg-white">
        <div className="relative">
          <ListingOptionsDropdown listing={listing} />
          <MutableCarousel slides={listing.images.map((i) => i.image)} />
        </div>
        <div className="mx-4">
          <h1 className="-mb-1 text-2xl font-bold">{listing.title}</h1>
          <AllergenList allergens={listing.allergens.map((a) => a.allergen)} />
          <p className="mt-2 text-lg">{listing.description}</p>
          <p className="mt-5 text-gray">
            {capitalize(dayjs(listing.updated_at).fromNow())}
          </p>
          <Separator />
          <FeatureList
            className="-mx-4 my-2 space-x-2 overflow-x-scroll px-2"
            features={listing.features.map((f) => f.feature)}
          />
          <Separator />
          {listing.producer.user.location && (
            <Map
              className="my-4 h-40 w-full"
              center={transformLocationToCoordinates(
                listing.producer.user.location as Point
              )}
            />
          )}
        </div>
      </div>
      <ListingDetailsDrawer listing={listing} />
    </BaseLayout>
  );
};

export default Listing;
