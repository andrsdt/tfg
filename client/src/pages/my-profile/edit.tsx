import { BackButton } from '@/components/Elements';
import { BaseLayout } from '@/components/Layouts';
import { ROLES } from '@/constants/roles';
import NEXT_ROUTES from '@/constants/routes';
import { UpdateProfileForm } from '@/features/users/components/Forms/UpdateProfileForm';
import { useAuth } from '@/hooks/useAuth';

const EditProfile = () => {
  const { user } = useAuth({ roles: [ROLES.AUTHENTICATED] });

  // TODO: skeleton loading for user
  if (!user) return <></>;

  return (
    // TODO: extract this to a layout with back button
    <BaseLayout className="p-4">
      <span className="mb-4 flex h-min items-center space-x-3">
        <BackButton className="h-8 w-8" href={NEXT_ROUTES.MY_PROFILE} />
        <h1 className="text-3xl font-bold">Edita tu perfil</h1>
      </span>
      <UpdateProfileForm className="flex h-full flex-col justify-between" />
    </BaseLayout>
  );
};

export default EditProfile;
