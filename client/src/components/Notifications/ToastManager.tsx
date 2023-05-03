import { useNotificationStore } from '@/stores/notifications';
import { useEffect } from 'react';
import { Toaster, toast } from 'sonner';

const TOAST_METHODS = {
  success: toast.success,
  error: toast.error,
  warning: toast.error,
  info: toast,
  default: toast,
};

export const ToastManager = () => {
  const { notifications, dismissNotification } = useNotificationStore();

  useEffect(() => {
    notifications.forEach((notification) => {
      const { type, message } = notification;
      const toastMethod = TOAST_METHODS[type] || TOAST_METHODS.default;
      toastMethod(message, {
        onDismiss: () => dismissNotification(notification.id),
        onAutoClose: () => dismissNotification(notification.id),
      });
    });
  }, [notifications]);

  return <Toaster richColors position="top-center" />;
};
