import { FieldError } from 'react-hook-form';
import { FieldWrapper } from './FieldWrapper';

type ChoiceButtonsFieldProps = {
  error: FieldError;
  children: React.ReactNode;
};

export const ChoiceButtonsField = ({
  error,
  children,
}: ChoiceButtonsFieldProps) => {
  return (
    <FieldWrapper error={error} className="pb-0">
      {children}
    </FieldWrapper>
  );
};

export const ChoiceButton = ({ value, label, registration }: any) => {
  return (
    <div className="inline-flex">
      <input
        type="radio"
        name="choice"
        className="peer hidden"
        value={value}
        id={value}
        {...registration}
      />
      <label
        htmlFor={value}
        className={
          'mr-4 cursor-pointer rounded-md bg-white px-3 py-2 text-center text-gray outline outline-1 outline-light-gray peer-checked:bg-green peer-checked:text-white peer-checked:outline-green  '
        }
      >
        {label}
      </label>
    </div>
  );
};
