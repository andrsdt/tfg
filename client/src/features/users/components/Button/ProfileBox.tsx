import { ChevronRightIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
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
  const isClickable = onClick || href;
  return (
    <button onClick={onClick}>
      <Link
        className={clsx(
          !isClickable && 'cursor-default',
          'flex w-full justify-between rounded-2xl bg-white p-4'
        )}
        href={href}
      >
        <span className="flex items-center text-lg">
          {IconWithClassname}
          {title}
        </span>
        {isClickable && <ChevronRightIcon className="w-8" />}
      </Link>
    </button>
  );
};
