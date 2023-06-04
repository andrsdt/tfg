import { Button } from '@/components/Elements';
import { useDrawersStore } from '@/stores/drawers';
import { useSearchParams } from 'next/navigation';
import router from 'next/router';
import { useState } from 'react';
import { FilterPill } from '../FilterPill';
import { Slider } from '@/components/Elements/Slider/Slider';

const MONEY_MARKS = [
  0, 0.5, 1, 1.5, 2, 4, 6, 8, 10, 15, 20, 30, 40, 50, 80, 100,
].map((value) => ({ value }));

export const PriceFilter = () => {
  const defaultText = 'Precio';
  const minPriceCents = useSearchParams().get('price_min');
  const maxPriceCents = useSearchParams().get('price_max');
  const minPrice = minPriceCents
    ? Number.parseInt(minPriceCents) / 100
    : undefined;
  const maxPrice = maxPriceCents
    ? Number.parseInt(maxPriceCents) / 100
    : undefined;
  const hasAnyFilter = minPrice || maxPrice;
  const onlyHasMinPrice = minPrice && !maxPrice;
  const onlyHasMaxPrice = !minPrice && maxPrice;

  const prettyTextPrice = {
    minPrice: `> ${minPrice}€`,
    maxPrice: `< ${maxPrice}€`,
    both: `${minPrice}€ — ${maxPrice}€`,
    // eslint-disable-next-line
  }[onlyHasMinPrice ? 'minPrice' : onlyHasMaxPrice ? 'maxPrice' : 'both'];

  return (
    <FilterPill
      text={hasAnyFilter ? prettyTextPrice : defaultText}
      drawerName="price"
      queries={['price_min', 'price_max']}
      Drawer={<PriceDrawer />}
    />
  );
};

const PriceDrawer = () => {
  const applyFilter = () => {
    router.push(
      {
        query: {
          ...router.query,
          price_min: priceRange[0] * 100,
          price_max: priceRange[1] * 100,
        },
      },
      undefined,
      {
        shallow: true,
      }
    );
  };
  const { closeDrawer } = useDrawersStore();
  const minPriceCents = useSearchParams().get('price_min') || '0';
  const maxPriceCents = useSearchParams().get('price_max') || '10000';
  const [priceRange, setPriceRange] = useState([
    Number.parseInt(minPriceCents) / 100,
    Number.parseInt(maxPriceCents) / 100,
  ]);

  return (
    <div className="text-start text-xl">
      <h1 className="text-3xl font-bold tracking-tight">Precio por kg</h1>
      <p className="mb-6 text-xl font-light text-gray">
        Rango de precios en el que quieres buscar
      </p>
      <span className="flex justify-between">
        <p className="mb-1 font-bold">{`${priceRange[0]}€ — ${priceRange[1]}€`}</p>
        <button className="text-green" onClick={() => setPriceRange([0, 100])}>
          Reiniciar
        </button>
      </span>
      <div className="px-2">
        <Slider
          value={priceRange}
          onChange={(_, newValue) => setPriceRange(newValue as number[])}
          marks={MONEY_MARKS}
          step={null}
        />
      </div>
      <Button
        className="mt-8 w-full"
        onClick={() => {
          applyFilter();
          closeDrawer();
        }}
      >
        APLICAR
      </Button>
    </div>
  );
};
