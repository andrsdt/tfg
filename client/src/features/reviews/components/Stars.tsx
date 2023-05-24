import clsx from 'clsx';
import starUrl from '/public/icons/star.svg?url';
import Image from 'next/image';

type StarsProps = {
  value?: number;
  setValue?: (value: number) => void;
  starSize?: number;
  className?: string;
};

export const Stars = ({ value, setValue, starSize, className }: StarsProps) => (
  // Star used for giving ratings to users after a ride
  <div className={clsx('flex flex-none items-center', className)}>
    {[1, 2, 3, 4, 5].map((star) => (
      <Image
        src={starUrl as any}
        alt="Estrella"
        width={starSize}
        height={starSize}
        key={star}
        onClick={() => setValue?.(star)}
        className={clsx(
          setValue && 'cursor-pointer',
          star <= value ? 'grayscale-0' : 'grayscale'
        )}
      />
    ))}
  </div>
);
