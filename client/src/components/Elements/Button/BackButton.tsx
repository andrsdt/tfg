import NEXT_ROUTES from '@/constants/routes';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import Link from 'next/link';

type BackButtonProps = {
  href?: string;
  className?: string;
  iconClassName?: string;
};

export const BackButton = ({
  href = NEXT_ROUTES.HOME,
  className,
  iconClassName = 'w-8 h-8',
}: BackButtonProps) => {
  return (
    <Link href={href} className={clsx(className)}>
      <ArrowLeftIcon className={clsx(iconClassName)} />
    </Link>
  );
};
