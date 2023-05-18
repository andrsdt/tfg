import { useRetrieveHandler } from '@/hooks/useRetrieveHandler';
import { listNotifications } from '../api/list';
import { Notification, NotificationCategory } from '../types/notifications';
import {
  ReminderCompleteProfileNotificationCard,
  NewProductLikeNotificationCard,
} from './Cards';

type NotificationComponentsType = {
  [key in NotificationCategory]: (
    notification: Notification
  ) => React.ReactElement;
};

export const NotificationList = () => {
  const [notifications] = useRetrieveHandler<Notification[], Notification[]>(
    listNotifications
  );

  return (
    <div className="flex flex-col space-y-3">
      {notifications?.map((notification: Notification) =>
        NOTIFICATION_COMPONENTS[notification.notification_type](notification)
      )}
    </div>
  );
};

// This is a mapping of each notification type to its respective component
export const NOTIFICATION_COMPONENTS: NotificationComponentsType = {
  REMINDER_COMPLETE_PROFILE: (notification) => (
    <ReminderCompleteProfileNotificationCard
      key={notification.id}
      notification={notification}
    />
  ),
  CHAT_MESSAGE: (notification) => (
    <div key={notification.id}>
      {notification.notification_type} not implemented yet
    </div>
  ),
  NEW_LISTING: (notification) => (
    <div key={notification.id}>
      {notification.notification_type} not implemented yet
    </div>
  ),
  NEW_REVIEW: (notification) => (
    <div key={notification.id}>
      {notification.notification_type} not implemented yet
    </div>
  ),
  NEW_LIKE: (notification) => (
    <NewProductLikeNotificationCard
      key={notification.id}
      notification={notification}
    />
  ),
  REMINDER_REVIEW: (notification) => (
    <div key={notification.id}>
      {notification.notification_type} not implemented yet
    </div>
  ),
  REPORT_CONFIRMATION: (notification) => (
    <div key={notification.id}>
      {notification.notification_type} not implemented yet
    </div>
  ),
};
