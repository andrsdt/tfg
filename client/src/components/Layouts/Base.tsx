import clsx from 'clsx';

type BaseLayoutProps = {
  children: React.ReactNode;
  className?: string;
};

export const BaseLayout = ({ children, className = '' }: BaseLayoutProps) => {
  const defaultBackground = className.includes('bg-') ? '' : 'bg-white';

  return (
    <div
      className={clsx(
        'h-full w-full overflow-x-hidden overflow-y-visible text-black',
        defaultBackground,
        className
      )}
    >
      {children}
    </div>
  );
};
