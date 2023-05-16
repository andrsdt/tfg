import clsx from 'clsx';
import * as React from 'react';

export type HollowButtonProps =
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    type?: 'button' | 'submit' | 'reset';
    className?: string;
    disabled?: boolean;
  };

export const HollowButton = React.forwardRef<
  HTMLButtonElement,
  HollowButtonProps
>(({ type = 'button', className = '', ...props }, ref) => {
  const { disabled } = props;

  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled}
      className={clsx(
        className,
        'text-md rounded-3xl border border-green bg-transparent py-2 text-center tracking-wider text-green',
        disabled && 'opacity-50 grayscale'
      )}
      {...props}
    >
      <span className="mx-2">{props.children}</span>
    </button>
  );
});

HollowButton.displayName = 'HollowButton';
