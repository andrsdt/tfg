import {
  BackButton,
  ThreeDotsDropdown,
  Separator,
} from '@/components/Elements';
import { Menu } from '@headlessui/react';
import { FunnelIcon } from '@heroicons/react/24/outline';
import { AllergensFilter } from './Filters/AllergensFilter';
import { FeaturesFilter } from './Filters/FeaturesFilter';
import { ListingSearchBar } from './SearchBar';
import { DistanceFilter } from './Filters/DistanceFilter';
import { PriceFilter } from './Filters/PriceFilter';

type SearchHeaderProps = {
  numberOfListings: number | undefined;
};

export const SearchHeader = ({ numberOfListings }: SearchHeaderProps) => {
  const LOADING_MESSAGE = 'Cargando...';
  const NO_RESULTS_MESSAGE = 'No hay resultados que coincidan con tu búsqueda';
  const SINGULAR_MESSAGE = (n) =>
    `Hay ${n} resultado que coincide con tu búsqueda`;
  const PLURAL_MESSAGE = (n) =>
    `Hay ${n} resultados que coinciden con tu búsqueda`;
  const resultsMessage = (n) => {
    if (n === 0) return NO_RESULTS_MESSAGE;
    if (n === 1) return SINGULAR_MESSAGE(n);
    if (n > 1) return PLURAL_MESSAGE(n);
    return LOADING_MESSAGE;
  };

  return (
    <header className="mb-2 rounded-b-3xl bg-white p-4 text-gray drop-shadow-lg">
      <span className="flex w-full items-center justify-between space-x-2">
        <BackButton className="mr-2 w-10" />
        <ListingSearchBar />
        <SearchOptionsDropdown />
      </span>
      <Separator className="-mx-4" />
      <FilterPicker />
      <p className="pt-2 text-gray">{resultsMessage(numberOfListings)}</p>
    </header>
  );
};

const SearchOptionsDropdown = () => {
  return (
    <ThreeDotsDropdown buttonClassName="relative h-10 w-10 -mr-2">
      <div className="absolute -top-4 right-4 origin-top-right justify-between rounded-xl bg-white p-4 shadow-lg">
        {/* TODO: add meaningful options */}
        <Menu.Item>
          <p>Opción A</p>
        </Menu.Item>
        <Separator />
        <Menu.Item>
          <p>Opción B</p>
        </Menu.Item>
        <Separator />
        <Menu.Item>
          <p>Opción C</p>
        </Menu.Item>
      </div>
    </ThreeDotsDropdown>
  );
};

const FilterPicker = () => {
  return (
    // TODO: make carousel
    <div className="-mx-4 flex items-center justify-start space-x-2 overflow-x-scroll px-4 pt-4">
      <FunnelIcon className="h-8 w-8 flex-none" />
      <hr className="h-9 w-px flex-none bg-light-gray text-light-gray" />
      <DistanceFilter />
      <AllergensFilter />
      <FeaturesFilter />
      <PriceFilter />
      {/* TODO: add the rest of filters (look at the backend's available queryParams for the filter) */}
    </div>
  );
};
