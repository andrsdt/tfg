import NEXT_ROUTES from '@/constants/routes';
import { XMarkIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

type CloseButtonProps = {
  href?: string;
};

export const CloseButton = ({ href = NEXT_ROUTES.HOME }: CloseButtonProps) => {
  return (
    <button>
      <Link href={href}>
        <XMarkIcon className="w-9" />
      </Link>
    </button>
  );
};
