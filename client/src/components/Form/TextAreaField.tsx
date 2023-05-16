import clsx from 'clsx';
import { UseFormRegisterReturn } from 'react-hook-form';

import { FieldWrapper, FieldWrapperPassThroughProps } from './FieldWrapper';

type TextAreaFieldProps = FieldWrapperPassThroughProps & {
  className?: string;
  registration: Partial<UseFormRegisterReturn>;
  inputProps?: React.TextareaHTMLAttributes<HTMLTextAreaElement>;
};

export const TextAreaField = (props: TextAreaFieldProps) => {
  const { className, registration, error, inputProps } = props;

  return (
    <FieldWrapper error={error}>
      <textarea
        className={clsx(
          'peer block min-h-[10rem] w-full appearance-none rounded-lg border-none bg-transparent p-2 text-lg leading-5 outline outline-1',
          className,
          error
            ? 'text-light-red outline-light-red focus:outline-light-red'
            : 'outline-light-gray focus:outline-green'
        )}
        {...inputProps}
        {...registration}
      />
    </FieldWrapper>
  );
};
