import { HollowButton, Separator } from '@/components/Elements';
import { LayoutWithNavbar } from '@/components/Layouts';
import Map from '@/components/Map/Map';
import NEXT_ROUTES from '@/constants/routes';
import { listRecentListingsByProducer } from '@/features/listings/api/listRecentByProducer';
import { ListingTwoColumnsList } from '@/features/listings/components/Lists';
import { Listing } from '@/features/listings/types/listings';
import { useRetrieveProducer } from '@/features/producers/api/retrieve';
import { Producer } from '@/features/producers/types/producers';
import { Avatar } from '@/features/users/components/Avatar';
import { Rating } from '@/features/users/components/Card/Rating';
import { useRetrieveHandler } from '@/hooks/useRetrieveHandler';
import { useToggle } from '@/hooks/useToggle';
import {
  shortenName,
  transformLocationToCoordinates,
} from '@/utils/formatters';
import clsx from 'clsx';
import { Point } from 'geojson';
import router, { useRouter } from 'next/router';

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

const PublicProfile = ({ pageProps }: ProfileProps) => {
  const { id } = pageProps;
  const router = useRouter();
  const { producer, isLoading, isError } = useRetrieveProducer(id);
  const [recentListings, isLoadingRecentListings, isErrorRecentListings] =
    useRetrieveHandler<Listing[], Listing[]>(() =>
      listRecentListingsByProducer(id)
    );

  // The public profile should only show active listings
  const activeListings = recentListings?.filter((listing) => listing.is_active);

  if (isError) router.push(NEXT_ROUTES.HOME);
  if (isLoading || isError || isLoadingRecentListings || isErrorRecentListings)
    return <></>;
  return (
    <LayoutWithNavbar className="p-4">
      <ProducerProfileHeader producer={producer} />
      <h1 className="mb-0.5 mt-4 text-2xl font-bold">Sobre el productor</h1>
      <CollapsibleText
        text={
          producer?.biography?.length > 0
            ? producer.biography
            : '(No hay información)'
        }
        readMoreThreshold={190}
      />
      {producer.user.location && (
        <Map
          className="mt-4 h-40 w-full"
          center={transformLocationToCoordinates(
            producer.user?.location as Point
          )}
        />
      )}
      <Separator className="my-4" />
      <h1 className="mb-2 text-2xl font-bold">Últimas publicaciones</h1>
      <ListingTwoColumnsList listings={activeListings} />
    </LayoutWithNavbar>
  );
};

export default PublicProfile;

type CollapsibleTextProps = {
  text: string;
  className?: string;
  collapsedClassName?: string;
  readMoreThreshold: number;
};

export const CollapsibleText = ({
  text = '',
  className,
  collapsedClassName = 'line-clamp-3',
  readMoreThreshold = 150,
}: CollapsibleTextProps) => {
  const [isCollapsed, toggleCollapsed] = useToggle(true);
  const showIsCollapsed = text?.length > readMoreThreshold;

  return (
    <div
      lang="es"
      className={clsx(
        'flex flex-col items-start hyphens-auto text-start leading-5',
        className
      )}
    >
      <p
        lang="es"
        className={clsx(
          isCollapsed && collapsedClassName,
          'text-md peer overflow-hidden hyphens-auto leading-5'
        )}
      >
        {text}
      </p>
      {showIsCollapsed && (
        <button className="text-green" onClick={toggleCollapsed}>
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
        <h1 className="mb-1 text-3xl font-bold leading-7">
          {shortenName(user.first_name, user.last_name)}
        </h1>
        <Rating user={user} />
        <HollowButton
          className="mt-3 font-semibold"
          onClick={() => router.push(NEXT_ROUTES.PRODUCER_REVIEWS(user.id))}
        >
          VER RESEÑAS
        </HollowButton>
      </div>
    </div>
  );
};
