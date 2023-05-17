import { Dialog } from '@/components/Dialog';
import { Pill } from '@/components/Elements';
import { useToggle } from '@/hooks/useToggle';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import { useSearchParams } from 'next/navigation';

type FilterPillProps = {
  name: string; // This is the name that will be displayed in the pill
  Drawer: React.ReactNode; // This is the drawer that will open when the pill is clicked
  queries: string[]; // If any of these queries are present in the URL, the pill will be highlighted
};

export const FilterPill = ({ name, Drawer, queries }: FilterPillProps) => {
  const [isOpenDrawer, toggleDrawer] = useToggle(false);
  const searchParams = useSearchParams();
  const isSelected = queries.some((q) => searchParams.get(q));

  return (
    <>
      <Pill
        onClick={toggleDrawer}
        isSelected={isSelected}
        className={clsx(
          'rounded-full px-3 py-1.5',
          isSelected ? 'self-start' : 'self-end'
        )}
      >
        {name}
        <ChevronDownIcon className="ml-1 inline w-4" />
      </Pill>
      <Dialog isOpen={isOpenDrawer} onClose={toggleDrawer}>
        <div className="z-10 w-full rounded-t-3xl bg-white p-4">{Drawer}</div>
      </Dialog>
    </>
  );
};
