import { ChevronRightIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import React from 'react';

type ProfileBoxProps = {
  children: React.ReactNode;
};

export const ProfileBox = ({ children }: ProfileBoxProps) => {
  return (
    <div className="flex w-full flex-col space-y-3 rounded-2xl bg-light-gray p-3">
      {children}
    </div>
  );
};

type ProfileButtonProps = {
  Icon: React.ReactNode;
  title: string;
  href?: string;
  onClick?: () => void;
};

export const ProfileButton = ({
  Icon,
  title,
  href = '',
  onClick,
}: ProfileButtonProps) => {
  const IconWithClassname = React.cloneElement(Icon as React.ReactElement, {
    className: 'w-7 mr-2',
  });

  return (
    <button onClick={onClick}>
      <Link
        className="flex w-full justify-between rounded-2xl bg-white p-4 text-black"
        href={href}
      >
        <span className="flex items-center text-lg">
          {IconWithClassname}
          {title}
        </span>
        <ChevronRightIcon className="w-8" />
      </Link>
    </button>
  );
};
