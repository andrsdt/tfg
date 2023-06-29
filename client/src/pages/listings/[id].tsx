import { Separator } from '@/components/Elements';
import { BubbleBackButton, Button } from '@/components/Elements/Button';
import { BaseLayout } from '@/components/Layouts';
import Map from '@/components/Map/Map';
import NEXT_ROUTES from '@/constants/routes';
import { activateListing } from '@/features/listings/api/activate';
import { deactivateListing } from '@/features/listings/api/deactivate';
import { retrieveListing } from '@/features/listings/api/retrieve';
import { MutableCarousel } from '@/features/listings/components/Carousel';
import { ListingDetailsDrawer } from '@/features/listings/components/Drawer';
import { ListingOptionsDropdown } from '@/features/listings/components/Dropdown/OptionsDropdown';
import { AllergenList } from '@/features/listings/components/Lists';
import { FeatureList } from '@/features/listings/components/Lists/Features';
import { Listing as TListing } from '@/features/listings/types/listings';
import { useAuth } from '@/hooks/useAuth';
import { useRetrieveHandler } from '@/hooks/useRetrieveHandler';
import { useSubmissionHandler } from '@/hooks/useSubmissionHandler';
import dayjs from '@/lib/dayjs';
import { capitalize, transformLocationToCoordinates } from '@/utils/formatters';
import clsx from 'clsx';
import { Point } from 'geojson';
import router from 'next/router';
import { useState } from 'react';

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
  const { user } = useAuth();
  const [isActive, setIsActive] = useState(true);
  const [listing, isLoading, isError] = useRetrieveHandler<TListing, TListing>(
    () => retrieveListing(id),
    {
      onSuccess: (data) => setIsActive(data.is_active),
      onError: async () => {
        await router.replace(NEXT_ROUTES.HOME);
      },
    }
  );
  const [disableListing, isSubmittingDisable] = useSubmissionHandler(
    () => deactivateListing({ id }),
    {
      onSuccess: async () => setIsActive(false),
    }
  );
  const [enableListing, isSubmittingEnable] = useSubmissionHandler(
    () => activateListing({ id }),
    {
      onSuccess: async () => setIsActive(true),
    }
  );

  const isListingOwner = user?.pk === listing?.producer.user.id;

  if (!listing || isLoading || isError) return <></>;

  return (
    <BaseLayout className="flex flex-col justify-between">
      <BubbleBackButton />
      <div
        className={clsx(
          'bg-white transition-[filter] duration-300',
          isActive ? 'grayscale-0' : 'grayscale-[80%]'
        )}
      >
        <div className="relative">
          <ListingOptionsDropdown listing={listing} />
          <MutableCarousel slides={listing.images.map((i) => i.image)} />
        </div>
        <div className="mx-4">
          {isListingOwner && (
            <span className="mb-2 flex w-full space-x-2">
              {isActive ? (
                <>
                  <Button
                    disabled={isSubmittingDisable}
                    onClick={disableListing}
                    className="w-full rounded-full bg-gray text-white"
                  >
                    {isSubmittingEnable ? 'DESACTIVANDO...' : 'DESACTIVAR'}
                  </Button>
                  <Button
                    disabled={!isActive}
                    onClick={() =>
                      router.push(NEXT_ROUTES.MARK_SOLD_LISTING(id))
                    }
                    className="w-full rounded-full bg-light-red text-white"
                  >
                    VENDIDO
                  </Button>
                </>
              ) : (
                <Button
                  disabled={isSubmittingEnable}
                  onClick={enableListing}
                  className="w-full rounded-full bg-green text-white"
                  // Omit grayscale filter when listing is active
                  style={{
                    filter: 'grayscale(0%) !important',
                  }}
                >
                  {isSubmittingEnable ? 'REACTIVANDO...' : 'REACTIVAR'}
                </Button>
              )}
            </span>
          )}
          <h1 className="-mb-1 text-2xl font-bold">{listing.title}</h1>
          <AllergenList allergens={listing.allergens.map((a) => a.allergen)} />
          <p lang="es" className="mt-2 hyphens-auto text-lg">
            {listing.description}
          </p>
          <p className="mt-5 text-gray">
            {capitalize(dayjs(listing.created_at).fromNow())}
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
