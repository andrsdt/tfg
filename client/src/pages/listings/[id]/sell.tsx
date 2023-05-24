import { BackButton } from '@/components/Elements';
import { BaseLayout } from '@/components/Layouts';
import { ROLES } from '@/constants/roles';
import NEXT_ROUTES from '@/constants/routes';
import { listConversationsFromListing } from '@/features/chats/api/listFromListing';
import { ConversationListItem } from '@/features/chats/components/ConversationListItem';
import { ConversationPreview } from '@/features/chats/types/conversations';
import { retrieveListing } from '@/features/listings/api/retrieve';
import { Listing } from '@/features/listings/types/listings';
import { useAuth } from '@/hooks/useAuth';
import { useRetrieveHandler } from '@/hooks/useRetrieveHandler';
import Link from 'next/link';
import router from 'next/router';

export const getServerSideProps = async ({ params }) => {
  return {
    props: {
      id: params.id,
    },
  };
};

type MarkListingAsSoldProps = {
  pageProps: {
    id: string;
  };
};

const MarkListingAsSold = ({ pageProps }: MarkListingAsSoldProps) => {
  const { id } = pageProps;
  useAuth({ roles: [ROLES.PRODUCER] });
  // TODO: auth check for producer who owns listing
  const [listing] = useRetrieveHandler<Listing, Listing>(
    () => retrieveListing(id),
    {
      onError: () => router.replace(NEXT_ROUTES.HOME),
    }
  );
  // Potential buyers: all users who I have had
  // a conversation with about this listing
  const [potentialBuyerConversations] = useRetrieveHandler<
    ConversationPreview[],
    ConversationPreview[]
  >(() => listConversationsFromListing(id), {
    onError: () => router.replace(NEXT_ROUTES.HOME),
  });

  if (!listing) return <>Loading...</>;
  return (
    <BaseLayout className="p-4">
      <span className="mb-3 flex h-min items-center space-x-3">
        <BackButton
          className="h-8 w-8"
          href={NEXT_ROUTES.DETAILS_LISTING(id)}
        />
        <h1 className="text-3xl font-bold">He realizado una venta</h1>
      </span>
      <p className="mb-3 text-xl">
        ¡Enhorabuena! Selecciona al <b className="text-green">usuario</b> al que
        has vendido tu producto:
      </p>
      <div className="flex flex-col items-center justify-center space-y-6 py-3">
        {potentialBuyerConversations?.map((conversation) => (
          <Link
            key={conversation.id}
            href={NEXT_ROUTES.MARK_SOLD_LISTING_VIA_CONVERSATION(
              listing.id,
              conversation.id
            )}
            className="w-full"
          >
            <ConversationListItem
              conversation={conversation}
              className="rounded-xl border border-light-gray p-3"
              mini
            />
          </Link>
        ))}
      </div>
      <Link
        href={NEXT_ROUTES.MARK_SOLD_LISTING_VIA_CONVERSATION(
          listing.id,
          'external'
        )}
      >
        <p className="text-center text-lg text-green">
          He vendido mi producto fuera de Grocerin
        </p>
      </Link>
    </BaseLayout>
  );
};

export default MarkListingAsSold;
