import { Components } from '@/types/openapi';
import { FunctionComponent, SVGAttributes } from 'react';
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

export type Allergen = Components.Schemas.AllergenEnum;

type Allergens = {
  [key in Allergen]: {
    name: Allergen;
    translation: string;
    icon: FunctionComponent<SVGAttributes<SVGElement>>;
  };
};

export const ALLERGENS = {
  CELERY: {
    name: 'CELERY',
    translation: 'apio',
    icon: celeryUrl,
  },
  CRUSTACEANS: {
    name: 'CRUSTACEANS',
    translation: 'crustáceos',
    icon: crustaceansUrl,
  },
  EGG: {
    name: 'EGG',
    translation: 'huevo',
    icon: eggUrl,
  },
  FISH: {
    name: 'FISH',
    translation: 'pescado',
    icon: fishUrl,
  },
  GLUTEN: {
    name: 'GLUTEN',
    translation: 'gluten',
    icon: glutenUrl,
  },
  LUPINS: {
    name: 'LUPINS',
    translation: 'altramuces',
    icon: lupinsUrl,
  },
  MILK: {
    name: 'MILK',
    translation: 'lactosa',
    icon: milkUrl,
  },
  MOLLUSKS: {
    name: 'MOLLUSKS',
    translation: 'moluscos',
    icon: mollusksUrl,
  },
  MUSTARD: {
    name: 'MUSTARD',
    translation: 'mostaza',
    icon: mustardUrl,
  },
  NUTS: {
    name: 'NUTS',
    translation: 'frutos con cáscara',
    icon: nutsUrl,
  },
  PEANUTS: {
    name: 'PEANUTS',
    translation: 'cacahuetes',
    icon: peanutsUrl,
  },
  SESAME: {
    name: 'SESAME',
    translation: 'sésamo',
    icon: sesameUrl,
  },
  SOYBEANS: {
    name: 'SOYBEANS',
    translation: 'soja',
    icon: soybeansUrl,
  },
  SULPHITES: {
    name: 'SULPHITES',
    translation: 'sulfitos',
    icon: sulphitesUrl,
  },
} as Allergens;
