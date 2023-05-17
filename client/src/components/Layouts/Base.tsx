import clsx from 'clsx';

type BaseLayoutProps = {
  children: React.ReactNode;
  className?: string;
};

export const BaseLayout = ({ children, className = '' }: BaseLayoutProps) => {
  return (
    <div
      className={clsx(
        'h-full w-full overflow-x-hidden overflow-y-visible bg-white text-black',
        className
      )}
    >
      {children}
    </div>
  );
};
