import NEXT_ROUTES from '@/constants/routes';
import { useAuth } from '@/hooks/useAuth';
import { Notification } from '../../types/notifications';
import { GenericUserNotificationCard } from './GenericUserNotificationCard';

type ReminderCompleteProfileNotificationCardProps = {
  notification: Notification;
};

export const ReminderCompleteProfileNotificationCard = ({
  notification,
}: ReminderCompleteProfileNotificationCardProps) => {
  const { user } = useAuth();

  return (
    <GenericUserNotificationCard
      href={NEXT_ROUTES.COMPLETE_ONBOARDING}
      notification={notification}
      user={user}
    >
      Termina de <b className="text-green">completar tu perfil</b> de Grocerin
    </GenericUserNotificationCard>
  );
};
