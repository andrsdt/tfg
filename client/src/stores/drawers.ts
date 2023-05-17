// Store that keeps track of which drawer is open in the search.
// This way, when the drawer component re-renders, it will know
// if it should be open or not.

import { create } from 'zustand';

export type DrawerType = 'allergens' | 'features' | 'price';

type OpenDrawerStore = {
  currentDrawer: DrawerType | null;
  setCurrentDrawer: (drawer: DrawerType | null) => void;
  closeDrawer: () => void;
  toggleDrawer: (drawer: DrawerType) => void;
};

const openDrawerStore = (set) => ({
  currentDrawer: null,
  setCurrentDrawer: (drawer) => set(() => ({ currentDrawer: drawer })),
  closeDrawer: () => set(() => ({ currentDrawer: null })),
  toggleDrawer: (drawer) =>
    set((state) => ({
      currentDrawer: state.currentDrawer === drawer ? null : drawer,
    })),
});

export const useDrawersStore = create<OpenDrawerStore>(openDrawerStore); // Store that keeps track of the current user's information.
