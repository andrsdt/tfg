import { BackButton } from '@/components/Elements';
import { LayoutWithNavbar } from '@/components/Layouts';
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
import { useRetrieveHandler } from '@/hooks/useRetreiveHandler';
import { useSubmissionHandler } from '@/hooks/useSubmissionHandler';
import { urltoFile } from '@/utils/base64';
import { emitSuccess } from '@/utils/notifications';
import router from 'next/router';

const redirectAndNotify = async (listing: Listing) => {
  await router.push(NEXT_ROUTES.DETAILS_LISTING(listing.id));
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
  useAuth({ roles: [ROLES.PRODUCER] });
  // TODO: auth check for producer who owns listing
  const [existingListing] = useRetrieveHandler(
    () => retrieveListing(pageProps.id),
    {
      onError: () => router.replace(NEXT_ROUTES.HOME),
      transform: async (res: Listing) => await listingToDTO(res),
    }
  );
  const [handleUpdateListing, isSubmitting, _, updatedListing] =
    useSubmissionHandler(updateListing, {
      onSuccess: () => redirectAndNotify(updatedListing),
    });

  if (!existingListing) return <>Loading...</>;
  return (
    <LayoutWithNavbar className="px-4">
      <BackButton />
      <ListingForm
        defaults={existingListing}
        onSubmit={(data) => handleUpdateListing({ id: pageProps.id }, data)}
        isSubmitting={isSubmitting}
      />
    </LayoutWithNavbar>
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
  };
};
