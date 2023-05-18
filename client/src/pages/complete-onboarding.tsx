import { CloseButton } from '@/components/Elements';
import { BaseLayout } from '@/components/Layouts';
import { ROLES } from '@/constants/roles';
import { UpdateProfileForm } from '@/features/users/components/components/UpdateProfileForm';
import { useAuth } from '@/hooks/useAuth';
import 'react-phone-input-2/lib/bootstrap.css';

const CompleteOnboarding = () => {
  useAuth({ roles: [ROLES.HAS_NOT_COMPLETED_ONBOARDING] });

  return (
    <BaseLayout className="p-4">
      <span className="flex h-min justify-between">
        <h1 className="text-3xl font-bold">Completa tu perfil</h1>
        <CloseButton />
      </span>
      <UpdateProfileForm className="flex h-[95%] flex-col justify-between" />
    </BaseLayout>
  );
};

export default CompleteOnboarding;
