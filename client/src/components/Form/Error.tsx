import clsx from 'clsx';
import { FieldError } from 'react-hook-form';

type ErrorProps = { error: FieldError; className?: string };

export const Error = ({ error, className }: ErrorProps) => (
  <div
    role="alert"
    aria-label={error.message}
    className={clsx(
      'w-full truncate text-start text-sm text-light-red',
      className
    )}
  >
    {error.message}
  </div>
);
