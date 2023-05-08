import { useState } from 'react';
import { InputField, InputFieldProps } from './InputField';
import Eye from '/public/icons/eye.svg';
import EyeSlash from '/public/icons/eye-slash.svg';

type PasswordFieldProps = Omit<InputFieldProps, 'type'>;

export const PasswordField = (props: PasswordFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputType = showPassword ? 'text' : 'password';

  return (
    <div className="group relative w-full transition-all duration-200 ease-linear motion-reduce:transition-none">
      <InputField {...props} type={inputType} />
      <button
        type="button"
        className="absolute right-4 top-3 text-light-gray"
        onClick={() => setShowPassword((prev) => !prev)}
      >
        {showPassword ? (
          <Eye className="h-8 w-8 bg-white text-light-gray group-invalid:text-light-red group-focus-within:text-black" />
        ) : (
          <EyeSlash className="h-8 w-8 bg-white text-light-gray group-invalid:text-light-red group-focus-within:text-black" />
        )}
      </button>
    </div>
  );
};
