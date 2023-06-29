import { BackButton, Separator } from '@/components/Elements';
import { FunnelIcon } from '@heroicons/react/24/outline';
import { AllergensFilter } from './Filters/AllergensFilter';
import { DistanceFilter } from './Filters/DistanceFilter';
import { FeaturesFilter } from './Filters/FeaturesFilter';
import { PriceFilter } from './Filters/PriceFilter';
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
    <header className="mb-2 rounded-b-3xl bg-white p-4 text-gray drop-shadow-lg">
      <span className="flex w-full items-center justify-between space-x-2">
        <BackButton className="mr-2 w-10" />
        <ListingSearchBar />
      </span>
      <Separator className="-mx-4" />
      <FilterPicker />
      <p className="pt-2 text-gray">{resultsMessage(numberOfListings)}</p>
    </header>
  );
};

const FilterPicker = () => {
  return (
    <div className="-mx-4 flex items-center justify-start space-x-2 overflow-x-scroll px-4 pt-4">
      <FunnelIcon className="h-8 w-8 flex-none" />
      <hr className="h-9 w-px flex-none bg-light-gray text-light-gray" />
      <DistanceFilter />
      <AllergensFilter />
      <FeaturesFilter />
      <PriceFilter />
    </div>
  );
};
