import clsx from 'clsx';

type SepraratorProps = {
  className?: string;
};

export const Separator = ({ className }: SepraratorProps) => {
  const hasMargin = className?.includes('my-');
  return (
    <hr className={clsx('text-light-gray', !hasMargin && 'my-2', className)} />
  );
};
