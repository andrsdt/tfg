import NEXT_ROUTES from '@/constants/routes';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams } from 'next/navigation';
import router from 'next/router';
import { useEffect, useState } from 'react';

export const ListingSearchBar = () => {
  const searchParams = useSearchParams();
  const [searchWord, setSearchWord] = useState('');

  // TODO: would it be possible to initialize the useState with the value of the searchParams?
  // I don't know since this is an inner component, not a next.js page itself. Maybe if we pass
  // the searchParams as a prop to this component?
  useEffect(() => {
    setSearchWord(searchParams.get('title') || '');
  }, [searchParams]);

  return (
    <form
      className="my-2 flex w-full items-center rounded-full bg-light-gray p-3.5"
      onSubmit={(e) => {
        e.preventDefault();
        router.push({
          pathname: NEXT_ROUTES.SEARCH_LISTINGS,
          query: { title: searchWord },
        });
      }}
    >
      <input
        type="text"
        placeholder="¿Qué te apetece comer hoy?"
        className="w-full bg-light-gray px-2 outline-none focus:outline-none"
        value={searchWord}
        onChange={(e) => setSearchWord(e.target.value)}
      />
      <button type="submit" className="outline-none focus:outline-none">
        <MagnifyingGlassIcon className="w-7" />
      </button>
    </form>
  );
};
