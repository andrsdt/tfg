import { useListNotifications } from '../api/list';
import { Notification, NotificationCategory } from '../types/notifications';
import {
  NewProductLikeNotificationCard,
  ReminderCompleteProfileNotificationCard,
} from './Cards';
import { NewChatMessageNotificationCard } from './Cards/NewChatMessageNotificationCard';
import { NewReviewNotificationCard } from './Cards/NewReviewNotificationCard';
import { ReviewOrderNotificationCard } from './Cards/ReviewOrderNotificationCard';

type NotificationComponentsType = {
  [key in NotificationCategory]: (
    notification: Notification
  ) => React.ReactElement;
};

export const NotificationList = () => {
  const { notifications } = useListNotifications();

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
    <NewChatMessageNotificationCard
      key={notification.id}
      notification={notification}
    />
  ),
  NEW_LISTING: (notification) => (
    <div key={notification.id}>
      {notification.notification_type} not implemented yet
    </div>
  ),
  NEW_REVIEW: (notification) => (
    <NewReviewNotificationCard
      key={notification.id}
      notification={notification}
    />
  ),
  NEW_LIKE: (notification) => (
    <NewProductLikeNotificationCard
      key={notification.id}
      notification={notification}
    />
  ),
  REVIEW_ORDER: (notification) => (
    <ReviewOrderNotificationCard
      key={notification.id}
      notification={notification}
    />
  ),
  REPORT_CONFIRMATION: (notification) => (
    <div key={notification.id}>
      {notification.notification_type} not implemented yet
    </div>
  ),
};
