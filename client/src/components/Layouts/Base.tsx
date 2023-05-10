import clsx from 'clsx';

type BaseLayoutProps = {
  children: React.ReactNode;
  className?: string;
};

export const BaseLayout = ({ children, className = '' }: BaseLayoutProps) => {
  return (
    <div className={clsx('w-full overflow-y-visible bg-white', className)}>
      {children}
    </div>
  );
};
