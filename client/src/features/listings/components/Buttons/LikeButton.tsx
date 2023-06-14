import NEXT_ROUTES from '@/constants/routes';
import { useAuth } from '@/hooks/useAuth';
import { HeartIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import router from 'next/router';
import { dislikeListing } from '../../api/dislike';
import { likeListing } from '../../api/like';
import { Listing } from '../../types/listings';
import { useState } from 'react';

type LikeButtonProps = {
  listing: Listing;
};

export const LikeButton = ({ listing }: LikeButtonProps) => {
  const [isLiked, setIsLiked] = useState(listing.is_favorite);
  const { user } = useAuth();

  const handleLike = async () => {
    if (!user) {
      await router.push(NEXT_ROUTES.LOGIN);
      return;
    }

    // Optimistic update on the UI
    if (isLiked) {
      setIsLiked(false);
      await dislikeListing({ id: listing.id });
    } else {
      setIsLiked(true);
      await likeListing({ id: listing.id });
    }
  };

  if (!listing.is_active) return <></>;

  return (
    <HeartIcon
      onClick={handleLike}
      className={clsx(
        'h-7 w-7 cursor-pointer transition-colors duration-100 ease-in-out',
        isLiked ? 'stroke-red text-light-red' : 'stroke-gray text-white'
      )}
    />
  );
};
