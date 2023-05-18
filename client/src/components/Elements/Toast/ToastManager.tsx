import { useToastStore } from '@/stores/toasts';
import { useEffect, useRef } from 'react';
import { Toaster, toast } from 'sonner';

const TOAST_METHODS = {
  success: toast.success,
  error: toast.error,
  warning: toast.error,
  info: toast,
  default: toast,
};

export const ToastManager = () => {
  const { toasts, dismissToast } = useToastStore();
  const lastToast = useRef(null);

  useEffect(() => {
    const newToasts = toasts.filter(
      (n) => !lastToast.current || n.id > lastToast.current.id
    );

    newToasts.forEach((toast) => {
      const { type, message } = toast;
      const toastMethod = TOAST_METHODS[type] || TOAST_METHODS.default;
      toastMethod(message, {
        onDismiss: () => dismissToast(toast.message),
        onAutoClose: () => dismissToast(toast.message),
      });
    });

    if (newToasts.length > 0) {
      lastToast.current = newToasts[newToasts.length - 1];
    }
  }, [toasts, dismissToast]);

  return <Toaster richColors position="top-center" />;
};
