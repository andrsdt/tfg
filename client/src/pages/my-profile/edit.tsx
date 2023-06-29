import { BackButton } from '@/components/Elements';
import { BaseLayout } from '@/components/Layouts';
import { ROLES } from '@/constants/roles';
import NEXT_ROUTES from '@/constants/routes';
import { deleteAccount } from '@/features/users/api/deleteAccount';
import { UpdateProfileForm } from '@/features/users/components/Forms/UpdateProfileForm';
import { useAuth } from '@/hooks/useAuth';
import { useSubmissionHandler } from '@/hooks/useSubmissionHandler';
import { emitInfo } from '@/utils/toasts';
import router from 'next/router';
import { useState } from 'react';

const EditProfile = () => {
  const { user } = useAuth({ roles: [ROLES.AUTHENTICATED] });

  if (!user) return <></>;

  return (
    <BaseLayout className="p-4">
      <span className="mb-4 flex h-min items-center space-x-3">
        <BackButton className="h-8 w-8" href={NEXT_ROUTES.MY_PROFILE} />
        <h1 className="text-3xl font-bold">Edita tu perfil</h1>
      </span>
      <UpdateProfileForm className="flex h-full flex-col justify-between" />
      <DeleteProfileButton />
    </BaseLayout>
  );
};

export default EditProfile;

const redirectAndNotify = async () => {
  await router.push(NEXT_ROUTES.HOME);
  emitInfo({
    title: 'Perfil eliminado',
    message: 'Tu perfil se ha eliminado correctamente. ¡Te esperamos pronto!',
  });
};

const DeleteProfileButton = () => {
  const [doubleConfirmation, setDoubleConfirmation] = useState(false);
  const [handleDeleteAccount] = useSubmissionHandler(deleteAccount, {
    onSuccess: redirectAndNotify,
  });

  return (
    <div className="flex justify-center pt-4">
      <button
        className="text-red"
        onClick={() =>
          doubleConfirmation
            ? handleDeleteAccount()
            : setDoubleConfirmation(true)
        }
      >
        {doubleConfirmation
          ? '¿Estás seguro de que quieres eliminar tu cuenta?'
          : 'Eliminar mi cuenta'}
      </button>
    </div>
  );
};
