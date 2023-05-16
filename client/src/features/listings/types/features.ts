import { FunctionComponent, SVGAttributes } from 'react';
import { Components } from '@/types/openapi';
import allowsDeliveryUrl from '/public/features/allows-delivery.svg?url';
import frozenUrl from '/public/features/frozen.svg?url';
import pickUpUrl from '/public/features/pick-up.svg?url';
import sugarFreeUrl from '/public/features/sugar-free.svg?url';
import veganUrl from '/public/features/vegan.svg?url';

export type Feature = Components.Schemas.FeatureEnum;

type Features = {
  [key in Feature]: {
    name: Feature;
    translation: string;
    icon: FunctionComponent<SVGAttributes<SVGElement>>;
  };
};

export const FEATURES = {
  ALLOWS_DELIVERY: {
    name: 'ALLOWS_DELIVERY',
    translation: 'Entrego a domicilio',
    icon: allowsDeliveryUrl,
  },
  ALLOWS_PICKUP: {
    name: 'ALLOWS_PICKUP',
    translation: 'Puedes recogerlo',
    icon: pickUpUrl,
  },
  IS_FROZEN: {
    name: 'IS_FROZEN',
    translation: 'Viene congelado',
    icon: frozenUrl,
  },
  IS_VEGAN: {
    name: 'IS_VEGAN',
    translation: 'Producto vegano',
    icon: veganUrl,
  },
  IS_SUGAR_FREE: {
    name: 'IS_SUGAR_FREE',
    translation: 'Sin azúcares añadidos',
    icon: sugarFreeUrl,
  },
} as Features;
