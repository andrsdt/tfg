import { Components } from '@/types/openapi';

export type Unit = Components.Schemas.UnitEnum;

type Units = {
  [key in Unit]: {
    name: Unit;
    translation: string;
    translationPlural: string;
    translationShort: string;
    translationShortPlural: string;
  };
};

export const UNITS: Units = {
  KG: {
    name: 'KG',
    translation: 'kilo',
    translationShort: 'kg',
    translationPlural: 'kilos',
    translationShortPlural: 'kgs',
  },
  UNIT: {
    name: 'UNIT',
    translation: 'unidad',
    translationShort: 'ud',
    translationPlural: 'unidades',
    translationShortPlural: 'uds',
  },
};
