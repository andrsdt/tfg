import { ALLERGENS, Allergen } from '@/features/listings/types/allergens';

import clsx from 'clsx';
import Image from 'next/image';

type AllergenListProps = {
  allergens: Allergen[];
  className?: string;
  props?: any;
};

export const AllergenList = ({
  allergens,
  className = '',
  props,
}: AllergenListProps) => {
  return (
    <div className={clsx(className, 'flex flex-wrap space-x-1')} {...props}>
      {allergens.map((allergen: string) => {
        const key = Object.keys(ALLERGENS).find(
          (k) => k === allergen.toUpperCase()
        );

        if (!key) return <></>;
        return (
          <Image
            key={allergen}
            src={ALLERGENS[key].icon}
            width={40}
            height={40}
            alt={allergen}
          />
        );
      })}
    </div>
  );
};
