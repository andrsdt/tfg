import { BackButton } from '@/components/Elements';
import NEXT_ROUTES from '@/constants/routes';
import { BasicListing } from '@/features/listings/types/listings';
import { Avatar } from '@/features/users/components/Avatar';
import { useAuth } from '@/hooks/useAuth';
import { getOtherUser } from '@/utils/conversation';
import { formatPricePerUnit } from '@/utils/formatters';
import { emitInfo } from '@/utils/toasts';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import router from 'next/router';
import { Conversation } from '../types/conversations';

type ChatHeaderProps = { conversation: Conversation };

const handleClickListing = (listing: BasicListing) => {
  if (listing.is_active) {
    router.push(NEXT_ROUTES.DETAILS_LISTING(listing.id));
  } else {
    emitInfo({
      message: 'El productor ha desactivado temporalmente este producto',
    });
  }
};

export const ChatHeader = ({ conversation }: ChatHeaderProps) => {
  // We have to detect if we are the initiator or the receiver of the conversation
  const { user } = useAuth();
  const otherUser = getOtherUser(conversation, user);
  const { listing } = conversation;
  if (!listing || !otherUser) return <></>;
  return (
    <span className="flex items-center bg-green p-4 text-white">
      <span className="flex w-full items-center">
        <BackButton href={NEXT_ROUTES.CHATS} className="h-8 w-8" />
        <button
          onClick={() => handleClickListing(listing)}
          className={clsx(
            'flex w-full space-x-3 px-2 text-start text-xl',
            !listing?.is_active && 'grayscale'
          )}
        >
          <Image
            src={listing?.images[0].image ?? '/placeholders/image.jpg'}
            alt={listing?.title}
            width={60}
            height={60}
            className="h-14 w-14 rounded-lg object-cover"
          />
          <div className="flex flex-col">
            <b className="line-clamp-1 break-all">{listing.title}</b>
            <p>{formatPricePerUnit(listing.price_per_unit, listing.unit)}</p>
          </div>
        </button>
      </span>
      <Link
        // TODO: WHEN IT'S THE PRODUCER THE ONE VIEWING THIS, IT
        // SHOULD NOT LINK ANYWHERE IF THE OTHER USER IS NOT A PRODUCER
        href={NEXT_ROUTES.PRODUCER_PROFILE(otherUser.id)}
        className="aspect-square h-12 w-12"
      >
        <Avatar src={otherUser?.photo} className="h-full w-full" />
      </Link>
    </span>
  );
};
