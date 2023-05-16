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
          className,
          'rounded-3xl bg-green py-4 text-center text-xl tracking-wider text-white hover:opacity-90',
          disabled && 'opacity-50 grayscale'
        )}
        {...props}
      >
        <span className="mx-2">{props.children}</span>
      </button>
    );
  }
);

Button.displayName = 'Button';
