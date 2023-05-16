import { BackButton } from '@/components/Elements';
import { LayoutWithNavbar } from '@/components/Layouts';
import { ROLES } from '@/constants/roles';
import NEXT_ROUTES from '@/constants/routes';
import { createListing } from '@/features/listings/api/create';
import { ListingForm } from '@/features/listings/components/Form/ListingForm';
import { Listing } from '@/features/listings/types/listings';
import { useAuth } from '@/hooks/useAuth';
import { useSubmissionHandler } from '@/hooks/useSubmissionHandler';
import { emitSuccess } from '@/utils/notifications';
import router from 'next/router';

const redirectAndNotify = async (listing: Listing) => {
  await router.push(NEXT_ROUTES.DETAILS_LISTING(listing.id));
  emitSuccess({
    title: 'Producto publicado',
    message: 'El producto se ha publicado correctamente',
  });
};
const Upload = () => {
  useAuth({ roles: [ROLES.PRODUCER] });

  const [handleCreateListing, isSubmitting, _, createdListing] =
    useSubmissionHandler(createListing, {
      onSuccess: () => redirectAndNotify(createdListing),
    });

  return (
    <LayoutWithNavbar className="px-4">
      <BackButton />
      <ListingForm onSubmit={handleCreateListing} isSubmitting={isSubmitting} />
    </LayoutWithNavbar>
  );
};

export default Upload;
