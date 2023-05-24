import clsx from 'clsx';
import Image from 'next/image';

type AvatarProps = {
  src: string;
  alt?: string;
  className?: string;
  props?: any;
};

export const Avatar = ({
  src = '',
  alt = 'Profile picture',
  className = '',
  props,
}: AvatarProps) => (
  <Image
    width={100}
    height={100}
    src={src?.length > 0 ? src : '/placeholders/avatar.png'}
    alt={alt}
    className={clsx('aspect-square rounded-full object-cover', className)}
    {...props}
  />
);
