import clsx from 'clsx';

type FixedDrawerProps = {
  children: React.ReactNode;
  className?: string;
};

export const FixedDrawer = ({ children, className = '' }: FixedDrawerProps) => {
  return (
    <div
      className={clsx(
        'sticky bottom-0 right-0 z-50 w-full rounded-t-2xl shadow-t-lg',
        className
      )}
    >
      {children}
    </div>
  );
};
