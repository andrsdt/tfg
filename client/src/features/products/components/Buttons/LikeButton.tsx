import { useToggle } from '@/hooks/useToggle';
import { HeartIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';

type LikeButtonProps = {
  product: any; // TODO: define type
};

export const LikeButton = ({ product }: LikeButtonProps) => {
  const [isLiked, toggleIsLiked] = useToggle(false); // TODO: implement

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
