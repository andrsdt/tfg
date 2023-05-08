import clsx from 'clsx';
import * as React from 'react';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  disabled?: boolean;
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ type = 'button', className = '', ...props }, ref) => {
    const { disabled } = props;

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        className={clsx(
          'rounded-3xl px-8 py-4 text-center text-xl tracking-wider text-white',
          disabled ? 'bg-gray opacity-50' : 'bg-green hover:opacity-90',
          className
        )}
        {...props}
      >
        <span className="mx-2">{props.children}</span>
      </button>
    );
  }
);

Button.displayName = 'Button';
