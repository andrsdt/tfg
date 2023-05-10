import NEXT_ROUTES from '@/constants/routes';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import Link from 'next/link';

type BackButtonProps = {
  className?: string;
};

export const BackButton = ({ className }: BackButtonProps) => {
  return (
    <Link
      href={NEXT_ROUTES.HOME}
      className={clsx('absolute left-4 top-4 z-50 rounded-full', className)}
    >
      <ArrowLeftIcon className="h-12 w-12 rounded-full bg-white p-3 shadow-xl" />
    </Link>
  );
};
