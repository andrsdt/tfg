import { Menu, Transition } from '@headlessui/react';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { Fragment } from 'react';

type ThreeDotsDropdownProps = {
  children: React.ReactNode;
  menuClassName?: string;
  buttonClassName?: string;
};

export const ThreeDotsDropdown = ({
  children,
  menuClassName,
  buttonClassName,
}: ThreeDotsDropdownProps) => {
  return (
    <Menu as="div" className={clsx(menuClassName)}>
      <div>
        <Menu.Button className={clsx(buttonClassName)}>
          <EllipsisVerticalIcon />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 origin-top-right whitespace-nowrap rounded-md bg-white text-end text-lg shadow-lg focus:outline-none">
          {children}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
