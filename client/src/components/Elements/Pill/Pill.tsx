import clsx from 'clsx';

type PillProps = {
  onClick: () => void;
  isSelected: boolean;
  className?: string;
  children: React.ReactNode;
};

export const Pill = ({
  onClick,
  isSelected,
  className,
  children,
}: PillProps) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        'border',
        isSelected
          ? 'border-green bg-green text-white'
          : 'border-gray bg-white text-black',
        className
      )}
    >
      {children}
    </button>
  );
};
