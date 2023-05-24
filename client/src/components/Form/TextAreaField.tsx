import clsx from 'clsx';
import { UseFormRegisterReturn } from 'react-hook-form';

import { FieldWrapper, FieldWrapperPassThroughProps } from './FieldWrapper';

type TextAreaFieldProps = FieldWrapperPassThroughProps & {
  className?: string;
  inputClassName?: string;
  registration: Partial<UseFormRegisterReturn>;
  inputProps?: React.TextareaHTMLAttributes<HTMLTextAreaElement>;
};

export const TextAreaField = (props: TextAreaFieldProps) => {
  const { className, inputClassName, registration, error, inputProps } = props;
  const hasMinHeight = inputClassName?.includes('min-h-');
  return (
    <FieldWrapper error={error} className={className}>
      <textarea
        className={clsx(
          'peer block w-full resize-none appearance-none rounded-lg border-none bg-transparent p-2 outline outline-1',
          !hasMinHeight && 'min-h-[10rem]',
          error
            ? 'text-light-red outline-light-red focus:outline-light-red'
            : 'outline-light-gray focus:outline-green',
          inputClassName
        )}
        {...inputProps}
        {...registration}
      />
    </FieldWrapper>
  );
};
