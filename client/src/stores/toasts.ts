import Toast from '@/types/toasts';
import { create } from 'zustand';

type ToastsStore = {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  dismissToast: (id: string) => void;
};

const toastsStore = (set) => ({
  toasts: [],
  addToast: (toast) =>
    set((state) => ({
      toasts: [...state.toasts, { id: Date.now(), ...toast }],
    })),

  dismissToast: (message) =>
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.message !== message),
    })),
});

export const useToastStore = create<ToastsStore>(toastsStore);
