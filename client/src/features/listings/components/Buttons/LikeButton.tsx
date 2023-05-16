import { useToggle } from '@/hooks/useToggle';
import { HeartIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import { Listing } from '../../types/listings';

type LikeButtonProps = {
  listing: Listing;
};

export const LikeButton = ({ listing }: LikeButtonProps) => {
  // TODO: implement logic
  const [isLiked, toggleIsLiked] = useToggle(false);

  return (
    <HeartIcon
      onClick={toggleIsLiked}
      className={clsx(
        'h-7 w-7 cursor-pointer transition-colors duration-100 ease-in-out',
        isLiked ? 'stroke-red text-light-red' : 'stroke-gray text-white'
      )}
    />
  );
};
