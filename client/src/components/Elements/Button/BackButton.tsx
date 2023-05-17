import NEXT_ROUTES from '@/constants/routes';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import Link from 'next/link';

type BackButtonProps = {
  className?: string;
  iconClassName?: string;
};

export const BackButton = ({ className, iconClassName }: BackButtonProps) => {
  return (
    <Link href={NEXT_ROUTES.HOME} className={clsx(className)}>
      <ArrowLeftIcon className={clsx(iconClassName)} />
    </Link>
  );
};
