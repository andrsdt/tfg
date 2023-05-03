export type NotificationType = 'info' | 'warning' | 'success' | 'error';

type Notification = {
  id: string;
  type: NotificationType;
  title: string;
  message?: string;
};

export default Notification;
