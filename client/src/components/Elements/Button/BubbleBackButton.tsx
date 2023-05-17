import clsx from 'clsx';
import { BackButton } from './BackButton';

type BubbleBackButtonProps = {
  className?: string;
};

export const BubbleBackButton = ({ className }: BubbleBackButtonProps) => {
  return (
    <BackButton
      className={clsx('absolute left-4 top-4 z-50 rounded-full', className)}
      iconClassName="h-12 w-12 rounded-full bg-white p-3 shadow-xl"
    />
  );
};
