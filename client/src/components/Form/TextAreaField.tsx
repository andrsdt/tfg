import clsx from 'clsx';
import { UseFormRegisterReturn } from 'react-hook-form';

import { FieldWrapper, FieldWrapperPassThroughProps } from './FieldWrapper';

type TextAreaFieldProps = FieldWrapperPassThroughProps & {
  className?: string;
  registration: Partial<UseFormRegisterReturn>;
};

export const TextAreaField = (props: TextAreaFieldProps) => {
  const { className, registration, error } = props;
  return (
    <FieldWrapper error={error}>
      <textarea
        className={clsx(
          'border-gray-300 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 block w-full appearance-none rounded-md border px-3 py-2 shadow-sm focus:outline-none sm:text-sm',
          className
        )}
        {...registration}
      />
    </FieldWrapper>
  );
};
