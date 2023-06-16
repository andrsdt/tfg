import { CloseButton } from '@/components/Elements';
import { BaseLayout } from '@/components/Layouts';
import { ROLES } from '@/constants/roles';
import { CompleteOnboardingForm } from '@/features/users/components/Forms/CompleteOnboardingForm';
import { useAuth } from '@/hooks/useAuth';

const CompleteOnboarding = () => {
  useAuth({ roles: [ROLES.AUTHENTICATED, ROLES.HAS_NOT_COMPLETED_ONBOARDING] });

  return (
    <BaseLayout className="p-4">
      <span className="flex h-min justify-between">
        <h1 className="text-3xl font-bold">Completa tu perfil</h1>
        <CloseButton />
      </span>
      <CompleteOnboardingForm className="flex h-[95%] flex-col justify-between" />
    </BaseLayout>
  );
};

export default CompleteOnboarding;
