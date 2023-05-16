import clsx from 'clsx';

type SepraratorProps = {
  className?: string;
};

export const Separator = ({ className }: SepraratorProps) => (
  <hr className={clsx('my-2 text-light-gray', className)} />
);
