import clsx from 'clsx';
import Link from 'next/link';

type GenericNotificationCardProps = {
  href: string;
  className?: string;
  children: React.ReactNode;
};

export const GenericNotificationCard = ({
  href,
  className,
  children,
}: GenericNotificationCardProps) => {
  return (
    <Link
      href={href}
      className={clsx(
        className,
        'h-full rounded-xl border border-light-gray p-2'
      )}
    >
      {children}
    </Link>
  );
};
