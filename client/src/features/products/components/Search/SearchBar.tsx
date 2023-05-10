import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export const ProductSearchBar = () => {
  return (
    <div className="my-2 flex w-full items-center rounded-full bg-light-gray p-3.5">
      <input
        type="text"
        placeholder="Qué te apetece comer hoy?"
        className="w-full bg-light-gray px-2 outline-none focus:outline-none"
      />
      <button type="submit" className="outline-none focus:outline-none">
        <MagnifyingGlassIcon className="w-7" />
      </button>
    </div>
  );
};
