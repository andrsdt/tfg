import clsx from 'clsx';

export const BaseLayout = ({ children, className = '' }) => {
  return <div className={clsx('relative w-full', className)}>{children}</div>;
};
