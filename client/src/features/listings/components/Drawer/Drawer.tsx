import { Button, FixedDrawer, Separator } from '@/components/Elements';
import { UserCard } from '@/features/users/components/Card';
import { formatMoney } from '@/utils/formatters';
import { Listing } from '../../types/listings';
import { UNITS } from '../../types/units';
import { useSubmissionHandler } from '@/hooks/useSubmissionHandler';
import { createChat } from '@/features/chats/api/create';
import { Conversation } from '@/features/chats/types/conversations';
import router from 'next/router';
import NEXT_ROUTES from '@/constants/routes';
import { useAuth } from '@/hooks/useAuth';

type ListingDetailsDrawerProps = {
  listing: Listing;
};

const redirectToConversation = async (conversation: Conversation) =>
  await router.push(NEXT_ROUTES.CHAT(conversation.id));

export const ListingDetailsDrawer = ({
  listing,
}: ListingDetailsDrawerProps) => {
  const { user } = useAuth();

  // TODO: use the new formatter formatQuantityWithUnit()
  const unit = UNITS[listing.unit].translationShort;
  const unitPlural = UNITS[listing.unit].translationShortPlural;
  const hasOneUnit = listing.available_quantity === 1;
  const [handleCreateChat] = useSubmissionHandler(
    () => createChat(listing.id),
    { onSuccess: redirectToConversation }
  );
  return (
    <FixedDrawer className="bg-white p-4">
      <UserCard user={listing.producer.user} />
      <Separator />
      <span className="grid grid-cols-3">
        {/* TODO: replace the raw enum with a prettify form (using the UNITS constant and translation like in allergens) */}
        <Entry
          title={`Precio (por ${unit})`}
          value={formatMoney(listing.price_per_unit)}
        />
        <Entry
          title="En stock"
          value={`${listing.available_quantity} ${
            hasOneUnit ? unit : unitPlural
          }`}
        />
        {user?.pk !== listing.producer.user.id && (
          <Button
            className="-ml-3 text-center font-semibold"
            onClick={handleCreateChat}
          >
            CHAT
          </Button>
        )}
      </span>
    </FixedDrawer>
  );
};

const Entry = ({ title, value }: { title: string; value: string }) => (
  <span className="flex flex-col items-start">
    <p className="text-md">{title}</p>
    <p className="text-xl font-semibold">{value}</p>
  </span>
);
