import { BackButton, Dropdown, Separator } from '@/components/Elements';
import { Menu } from '@headlessui/react';
import { FunnelIcon } from '@heroicons/react/24/outline';
import { AllergensFilter } from './Filters/AllergensFilter';
import { FeaturesFilter } from './Filters/FeaturesFilter';
import { ListingSearchBar } from './SearchBar';

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
    <header className="rounded-b-3xl bg-white p-4 text-gray">
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
    <Dropdown buttonClassName="relative h-10 w-10 -mr-2">
      <div className="absolute -top-4 right-8 origin-top-right justify-between rounded-xl p-4 shadow-lg">
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
    </Dropdown>
  );
};

const FilterPicker = () => {
  return (
    <div className="flex items-center justify-start space-x-2 pt-4">
      <FunnelIcon className="h-8 w-8" />
      <AllergensFilter />
      <FeaturesFilter />
    </div>
  );
};
