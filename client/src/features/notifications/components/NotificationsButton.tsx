import NEXT_ROUTES from '@/constants/routes';
import { useRetrieveHandler } from '@/hooks/useRetrieveHandler';
import { BellIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { countUnreadNotifications } from '../api/countUnread';

export const NotificationsButton = () => {
  const [numNotifications] = useRetrieveHandler(countUnreadNotifications, {
    transform: async (data) => data.count,
  });

  return (
    <Link className="relative" href={NEXT_ROUTES.NOTIFICATIONS}>
      {!!numNotifications && (
        <span className="absolute right-0 top-0 inline-flex aspect-square h-6 w-6 -translate-y-2 translate-x-1 transform items-center justify-center rounded-full bg-light-red text-sm font-bold leading-none text-white">
          {numNotifications}
        </span>
      )}
      <BellIcon className="w-8" />
    </Link>
  );
};
