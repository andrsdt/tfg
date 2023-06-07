import { BubbleBackButton } from '@/components/Elements';
import { BaseLayout } from '@/components/Layouts';
import { ROLES } from '@/constants/roles';
import NEXT_ROUTES from '@/constants/routes';
import { retrieveListing } from '@/features/listings/api/retrieve';
import {
  UpdateListingDTO,
  updateListing,
} from '@/features/listings/api/update';
import { ListingForm } from '@/features/listings/components/Form/ListingForm';
import { Listing } from '@/features/listings/types/listings';
import { useAuth } from '@/hooks/useAuth';
import { useRetrieveHandler } from '@/hooks/useRetrieveHandler';
import { useSubmissionHandler } from '@/hooks/useSubmissionHandler';
import { urltoFile } from '@/utils/base64';
import { emitSuccess } from '@/utils/toasts';
import router from 'next/router';

const redirectAndNotify = async (listingId: number | string) => {
  await router.push(NEXT_ROUTES.DETAILS_LISTING(listingId));
  emitSuccess({
    title: 'Producto modificado',
    message: 'El producto se ha modificado correctamente',
  });
};

export const getServerSideProps = async ({ params }) => {
  return {
    props: {
      id: params.id,
    },
  };
};

type EditListingProps = {
  pageProps: {
    id: string;
  };
};

const EditListing = ({ pageProps }: EditListingProps) => {
  const listingId = pageProps.id;
  useAuth({ roles: [ROLES.PRODUCER] });
  // TODO: auth check for producer who owns listing
  const [existingListing] = useRetrieveHandler(
    () => retrieveListing(listingId),
    {
      onError: async () => await router.replace(NEXT_ROUTES.HOME),
      transform: async (res: Listing) => await listingToDTO(res),
    }
  );
  const [handleUpdateListing, isSubmitting] = useSubmissionHandler(
    updateListing,
    {
      onSuccess: async () => await redirectAndNotify(listingId),
    }
  );

  if (!existingListing) return <>Loading...</>;
  return (
    <BaseLayout className="flex flex-col px-4 pb-4">
      <BubbleBackButton />
      <ListingForm
        defaults={existingListing}
        onSubmit={async (data) =>
          await handleUpdateListing({ id: listingId }, data)
        }
        isSubmitting={isSubmitting}
        isEdit
      />
    </BaseLayout>
  );
};

export default EditListing;

// Transforms a listing to a DTO that can be used in the form.
// This means that the images are converted to files, and the
// allergens and features are converted to strings, as they are
// sent to the backend.
const listingToDTO = async (listing: Listing): Promise<UpdateListingDTO> => {
  return {
    ...listing,
    images: await Promise.all(
      listing.images?.map(async (i) => await urltoFile(i.image))
    ),
    allergens: listing.allergens?.map((a) => a.allergen),
    features: listing.features?.map((f) => f.feature),
    price_per_unit: listing.price_per_unit / 100, // Database stores price in cents, but user enters it in EUR
  };
};
