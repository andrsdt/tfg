import { create } from 'zustand';

export type NotificationType = 'info' | 'warning' | 'success' | 'error';

type Notification = {
  id: string;
  type: NotificationType;
  title: string;
  message?: string;
};

type NotificationsStore = {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  dismissNotification: (id: string) => void;
};

const notificationsStore = (set) => ({
  notifications: [],
  addNotification: (notification) =>
    set((state) => ({
      notifications: [
        ...state.notifications,
        { id: Date.now(), ...notification },
      ],
    })),

  dismissNotification: (message) =>
    set((state) => ({
      notifications: state.notifications.filter(
        (notification) => notification.message !== message
      ),
    })),
});

export const useNotificationStore =
  create<NotificationsStore>(notificationsStore);
