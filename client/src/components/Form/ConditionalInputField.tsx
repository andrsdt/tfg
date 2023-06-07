import clsx from 'clsx';
import { ReactNode } from 'react';

type ConditionalInputFieldProps = {
  showIf?: boolean;
  title: string;
  children: ReactNode;
};

export const ConditionalInputField = ({
  showIf = true,
  title,
  children,
}: ConditionalInputFieldProps) => (
  <div className={clsx(!showIf && 'hidden')}>
    <h3 className="mb-2 text-xl font-semibold">{title}</h3>
    {children}
  </div>
);
