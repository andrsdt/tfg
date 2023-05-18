export type ToastType = 'info' | 'warning' | 'success' | 'error';

type Toast = {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
};

export default Toast;
