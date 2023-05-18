import NEXT_ROUTES from '@/constants/routes';
import { Notification } from '../../types/notifications';
import { GenericUserNotificationCard } from './GenericUserNotificationCard';

type ReminderCompleteProfileNotificationCardProps = {
  notification: Notification;
};

export const ReminderCompleteProfileNotificationCard = ({
  notification,
}: ReminderCompleteProfileNotificationCardProps) => {
  return (
    <GenericUserNotificationCard
      href={NEXT_ROUTES.COMPLETE_ONBOARDING}
      notification={notification}
      user={undefined} // No profile photo. Could call useAuth() to get it though
    >
      Termina de <b className="text-green">completar tu perfil</b> de Grocerin
    </GenericUserNotificationCard>
  );
};
