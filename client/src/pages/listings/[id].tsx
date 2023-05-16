import { Separator } from '@/components/Elements';
import { BackButton } from '@/components/Elements/Button';
import { BaseLayout } from '@/components/Layouts';
import { retrieveListing } from '@/features/listings/api/retrieve';
import { MutableCarousel } from '@/features/listings/components/Carousel';
import { ListingDetailsDrawer } from '@/features/listings/components/Drawer';
import { ListingOptionsDropdown } from '@/features/listings/components/Dropdown/OptionsDropdown';
import { AllergenList } from '@/features/listings/components/Lists';
import { FeatureList } from '@/features/listings/components/Lists/Features';
import { useRetrieveHandler } from '@/hooks/useRetreiveHandler';
import dayjs from '@/lib/dayjs';

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
  const [listing, isLoading, isError] = useRetrieveHandler(() =>
    retrieveListing(id)
  );

  if (!listing || isLoading || isError) return <></>;

  return (
    <BaseLayout className="flex flex-col justify-between">
      <BackButton />
      <div className="bg-white">
        <div className="relative">
          <ListingOptionsDropdown listing={listing} />
          <MutableCarousel slides={listing.images.map((i) => i.image)} />
        </div>
        <div className="mx-4">
          <h1 className="text-2xl font-bold">{listing.title}</h1>
          <AllergenList allergens={listing.allergens.map((a) => a.allergen)} />
          <p>{listing.description}</p>
          <span className="mt-5 flex w-full justify-between text-lg">
            <p>{dayjs(listing.updated_at).format('DD/MM/YYYY')}</p>
          </span>
          <Separator />
          <FeatureList
            className="-mx-4 my-2 overflow-x-scroll"
            features={listing.features.map((f) => f.feature)}
          />
          <Separator />
        </div>
        {/* <listingLocation location={data.location} /> */}
      </div>
      <ListingDetailsDrawer listing={listing} />
    </BaseLayout>
  );
};

export default Listing;
