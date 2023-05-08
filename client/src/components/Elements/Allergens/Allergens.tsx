import { Allergen } from '@/types/allergens';

import celeryUrl from '/public/allergens/celery.svg?url';
import crustaceansUrl from '/public/allergens/crustaceans.svg?url';
import eggUrl from '/public/allergens/egg.svg?url';
import fishUrl from '/public/allergens/fish.svg?url';
import glutenUrl from '/public/allergens/gluten.svg?url';
import lupinsUrl from '/public/allergens/lupins.svg?url';
import milkUrl from '/public/allergens/milk.svg?url';
import mollusksUrl from '/public/allergens/mollusks.svg?url';
import mustardUrl from '/public/allergens/mustard.svg?url';
import nutsUrl from '/public/allergens/nuts.svg?url';
import peanutsUrl from '/public/allergens/peanuts.svg?url';
import sesameUrl from '/public/allergens/sesame.svg?url';
import soybeansUrl from '/public/allergens/soybeans.svg?url';
import sulphitesUrl from '/public/allergens/sulphites.svg?url';

import Image from 'next/image';

const allergensIcons = {
  celery: celeryUrl,
  crustaceans: crustaceansUrl,
  egg: eggUrl,
  fish: fishUrl,
  gluten: glutenUrl,
  lupins: lupinsUrl,
  milk: milkUrl,
  mollusks: mollusksUrl,
  mustard: mustardUrl,
  nuts: nutsUrl,
  peanuts: peanutsUrl,
  sesame: sesameUrl,
  soybeans: soybeansUrl,
  sulphites: sulphitesUrl,
} as Record<Allergen, any>;

type AllergensListProps = {
  allergens: Allergen[];
};

export const AllergensList = ({ allergens }: AllergensListProps) => {
  return (
    <div className="flex flex-none space-x-2">
      {allergens.map((allergen) => (
        <Image
          key={allergen}
          src={allergensIcons[allergen]}
          width={40}
          height={40}
          alt={allergen}
        />
      ))}
    </div>
  );
};
