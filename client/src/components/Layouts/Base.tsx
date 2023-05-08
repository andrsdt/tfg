import clsx from 'clsx';

type BaseLayoutProps = {
  children: React.ReactNode;
  className?: string;
};

export const BaseLayout = ({ children, className = '' }: BaseLayoutProps) => {
  return <div className={clsx('relative w-full', className)}>{children}</div>;
};
