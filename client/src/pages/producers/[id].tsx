import { HollowButton, Separator } from '@/components/Elements';
import { LayoutWithNavbar } from '@/components/Layouts';
import NEXT_ROUTES from '@/constants/routes';
import { listRecentListingsByProducer } from '@/features/listings/api/listRecentByProducer';
import { ListingCard } from '@/features/listings/components/Card/Card';
import { Listing } from '@/features/listings/types/listings';
import { retrieveProducer } from '@/features/producers/api/retrieve';
import { Producer } from '@/features/producers/types/producers';
import Avatar from '@/features/users/components/Avatar/Avatar';
import { useRetrieveHandler } from '@/hooks/useRetrieveHandler';
import { useToggle } from '@/hooks/useToggle';
import clsx from 'clsx';
import { useRouter } from 'next/router';

export const getServerSideProps = async (context) => {
  const { id } = context.params;
  return {
    props: {
      id,
    },
  };
};

type ProfileProps = {
  pageProps: {
    id: string;
  };
};

const Profile = ({ pageProps }: ProfileProps) => {
  const { id } = pageProps;
  const router = useRouter();
  const [producer, isLoading, isError] = useRetrieveHandler(
    () => retrieveProducer(id),
    {
      // TODO: look into this so we can omit it
      transform: async (res) => res,
    }
  );
  const [recentListings, isLoadingRecentListings, isErrorRecentListings] =
    useRetrieveHandler(() => listRecentListingsByProducer(id), {
      // TODO: look into this so we can omit it
      transform: async (res) => res,
    });

  if (isError) router.push(NEXT_ROUTES.HOME);
  if (isLoading || isError || isLoadingRecentListings || isErrorRecentListings)
    return <></>;

  return (
    <LayoutWithNavbar className="p-4">
      <ProducerProfileHeader producer={producer} />
      <h1 className="mt-4 text-2xl font-bold">Sobre el productor</h1>
      <CollapsibleText
        text={producer?.biography ?? 'No hay información sobre el productor'}
        readMoreThreshold={190}
      />
      <Separator className="my-4" />
      <h1 className="text-2xl font-bold">Últimas publicaciones</h1>
      <div className="grid grid-cols-2 gap-x-3 gap-y-5">
        {recentListings?.map((listing: Listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>
    </LayoutWithNavbar>
  );
};

export default Profile;

type CollapsibleTextProps = { text: string; readMoreThreshold: number };
const CollapsibleText = ({
  text = '',
  readMoreThreshold = 150,
}: CollapsibleTextProps) => {
  const [isCollapsed, toggleCollapsed] = useToggle(true);
  const showIsCollapsed = text?.length > readMoreThreshold;

  return (
    <div className="flex flex-col items-start text-start leading-5">
      <p
        className={clsx(
          isCollapsed && 'line-clamp-3',
          'text-md peer overflow-hidden leading-5'
        )}
      >
        {text}
      </p>
      {showIsCollapsed && (
        <button
          className="text-green peer-[overflow]:underline"
          onClick={toggleCollapsed}
        >
          {isCollapsed ? 'Leer más' : 'Leer menos'}
        </button>
      )}
    </div>
  );
};

type ProducerProfileHeaderProps = {
  producer: Producer;
};

const ProducerProfileHeader = ({ producer }: ProducerProfileHeaderProps) => {
  const { user } = producer;

  return (
    <div className="flex space-x-4">
      <Avatar src={user.photo} alt="Profile picture" className="w-32" />
      <div className="flex flex-col py-2">
        <h1 className="text-3xl font-bold leading-7">
          {user.first_name} {user.last_name}
        </h1>
        <h2 className="text-lg">⭐ 4.8 &middot; 14 valoraciones</h2>
        <HollowButton className="mt-3 font-semibold">
          ENVIAR MENSAJE
        </HollowButton>
      </div>
    </div>
  );
};
