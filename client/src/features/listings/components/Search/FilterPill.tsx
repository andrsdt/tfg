import { Dialog } from '@/components/Dialog';
import { Pill } from '@/components/Elements';
import { DrawerType, useDrawersStore } from '@/stores/drawers';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import { useSearchParams } from 'next/navigation';

type FilterPillProps = {
  text: string; // This is the text that will be displayed in the pill
  drawerName: DrawerType; // This is the name that identifies the drawer to open
  Drawer: React.ReactNode; // This is the drawer that will open when the pill is clicked
  queries: string[]; // If any of these queries are present in the URL, the pill will be highlighted
  show?: boolean; // If false, the pill will not be rendered
};

export const FilterPill = ({
  text,
  drawerName,
  Drawer,
  queries,
  show = true,
}: FilterPillProps) => {
  const { currentDrawer, setCurrentDrawer, closeDrawer } = useDrawersStore();
  const isOpenDrawer = currentDrawer === drawerName;
  const openDrawer = () => setCurrentDrawer(drawerName);

  const searchParams = useSearchParams();
  const isSelected = queries.some((q) => searchParams.get(q));

  if (!show) return <></>;
  return (
    <>
      <Pill
        onClick={openDrawer}
        isSelected={isSelected}
        className={clsx(
          'flex-none rounded-full px-3 py-1.5',
          isSelected ? 'self-start' : 'self-end'
        )}
      >
        {text}
        <ChevronDownIcon className="ml-1 inline w-4" />
      </Pill>
      <Dialog isOpen={isOpenDrawer} onClose={closeDrawer}>
        <div className="z-10 w-full rounded-t-3xl bg-white p-4">{Drawer}</div>
      </Dialog>
    </>
  );
};
