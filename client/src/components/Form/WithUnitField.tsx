import clsx from 'clsx';
import { FieldWrapper, FieldWrapperPassThroughProps } from './FieldWrapper';

type WithUnitFieldProps = FieldWrapperPassThroughProps & {
  unit: string;
  className?: string;
  children: React.ReactNode;
};

export const WithUnitField = ({
  unit,
  className,
  children,
  error,
}: WithUnitFieldProps) => {
  return (
    // TODO: There must be a better way to apply outline-green to the inner group without having to add a group parent
    <FieldWrapper className="group mb-0" error={error}>
      <div
        className={clsx(
          'flex w-min items-center rounded-md outline outline-1',
          error
            ? 'text-red outline-light-red group-focus-within:outline-light-red'
            : 'text-gray outline-light-gray group-focus-within:outline-green',
          className
        )}
      >
        {children}
        <span
          className={clsx(
            'rounded-r-md bg-white px-4 py-2 text-xl font-semibold outline outline-1',
            ' group-focus-within:text-white ',
            error
              ? 'text-light-red outline-light-red group-focus-within:bg-light-red group-focus-within:outline-light-red'
              : 'text-gray outline-light-gray group-focus-within:bg-green group-focus-within:outline-green'
          )}
        >
          {unit}
        </span>
      </div>
    </FieldWrapper>
  );
};
