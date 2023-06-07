import clsx from 'clsx';
import { UseFormRegisterReturn } from 'react-hook-form';

import { FieldWrapper, FieldWrapperPassThroughProps } from './FieldWrapper';

export type InputFieldProps = FieldWrapperPassThroughProps & {
  type?: 'text' | 'email' | 'password' | 'number';
  label?: string;
  className?: string;
  registration: Partial<UseFormRegisterReturn>;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
};

export const InputField = (props: InputFieldProps) => {
  const {
    type = 'text',
    label,
    className,
    registration,
    error,
    inputProps,
  } = props;

  return (
    <FieldWrapper className={clsx(className)} error={error}>
      <div className="relative flex flex-col">
        <input
          id={registration.name}
          type={type}
          className={clsx(
            'peer block min-h-[auto] appearance-none rounded-lg border-none bg-transparent px-2 py-3 text-lg outline outline-1 transition-all duration-200 ease-linear motion-reduce:transition-none',
            error
              ? 'text-light-red outline-light-red focus:outline-light-red'
              : 'outline-light-gray focus:outline-green'
          )}
          {...registration}
          {...inputProps}
        />
        <label
          htmlFor={registration.name}
          className={clsx(
            error
              ? 'text-light-red peer-focus:text-light-red'
              : 'text-light-gray peer-focus:text-green',
            'pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] -translate-y-5 scale-75 truncate bg-transparent bg-white px-1.5 pt-3 transition-all duration-200 ease-out motion-reduce:transition-none'
          )}
        >
          {label}
        </label>
      </div>
    </FieldWrapper>
  );
};
