import { CloseButton } from '@/components/Elements';
import { BaseLayout } from '@/components/Layouts';
import { ROLES } from '@/constants/roles';
import { NotificationList } from '@/features/notifications/components';
import { useAuth } from '@/hooks/useAuth';

const Notifications = () => {
  useAuth({ roles: [ROLES.AUTHENTICATED] });

  return (
    <BaseLayout className="p-4">
      <span className="mb-4 flex h-min justify-between">
        <h1 className="text-3xl font-bold">Tus notificaciones</h1>
        <CloseButton />
      </span>
      <NotificationList />
    </BaseLayout>
  );
};

export default Notifications;
