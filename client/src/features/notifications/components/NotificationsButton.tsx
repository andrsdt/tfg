import NEXT_ROUTES from '@/constants/routes';
import { BellIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useCountUnreadNotifications } from '../api/countUnread';
import { Transition } from '@headlessui/react';

export const NotificationsButton = () => {
  const { numNotifications } = useCountUnreadNotifications();
  return (
    <Link className="relative" href={NEXT_ROUTES.NOTIFICATIONS}>
      <Transition
        show={!!numNotifications}
        enter="transition ease-in duration-300 absolute -right-0 -top-0"
        enterFrom="transform opacity-0 scale-0"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-300 absolute -right-0 -top-0"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-0"
      >
        <span className="absolute -right-2 -top-2 inline-flex aspect-square h-6 w-6 origin-center items-center justify-center rounded-full bg-light-red text-sm font-bold leading-none text-white">
          {numNotifications}
        </span>
      </Transition>
      <BellIcon className="w-8" />
    </Link>
  );
};
