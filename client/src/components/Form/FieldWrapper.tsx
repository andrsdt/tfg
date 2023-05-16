import * as React from 'react';
import { FieldError } from 'react-hook-form';
import clsx from 'clsx';
import { Error } from './Error';

type FieldWrapperProps = {
  className?: string;
  children: React.ReactNode;
  error?: FieldError;
  description?: string;
};

export type FieldWrapperPassThroughProps = Omit<
  FieldWrapperProps,
  'className' | 'children'
>;

export const FieldWrapper = (props: FieldWrapperProps) => {
  const { className, error, children } = props;
  return (
    <div className={clsx('relative pb-3.5', className)}>
      <div>{children}</div>
      {error?.message && <Error error={error} className="absolute -bottom-2" />}
    </div>
  );
};
