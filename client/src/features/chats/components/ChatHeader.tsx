import { BackButton } from '@/components/Elements';
import NEXT_ROUTES from '@/constants/routes';
import { BasicListing } from '@/features/listings/types/listings';
import { Avatar } from '@/features/users/components/Avatar';
import { AuthenticatedUser } from '@/features/users/types/users';
import { useAuth } from '@/hooks/useAuth';
import { getOtherUser } from '@/utils/conversation';
import { formatPricePerUnit } from '@/utils/formatters';
import { emitInfo } from '@/utils/toasts';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { Conversation } from '../types/conversations';

type ChatHeaderProps = { conversation: Conversation };

const handleClickListing = (listing: BasicListing, user: AuthenticatedUser) => {
  if (!listing.is_active && listing.producer.user.id !== user.pk) {
    emitInfo({
      message: 'El productor ha desactivado temporalmente este producto',
    });
  } else {
    window.location.href = NEXT_ROUTES.DETAILS_LISTING(listing.id);
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
          onClick={() => handleClickListing(listing, user)}
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
        href={
          otherUser.is_producer
            ? NEXT_ROUTES.PRODUCER_PROFILE(otherUser.id)
            : '#'
        }
        className={clsx(
          !otherUser.is_producer && 'pointer-events-none',
          'aspect-square h-12 w-12'
        )}
      >
        <Avatar src={otherUser?.photo} className="h-full w-full" />
      </Link>
    </span>
  );
};
