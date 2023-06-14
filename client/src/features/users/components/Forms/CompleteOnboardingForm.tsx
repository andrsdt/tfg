import { Button } from '@/components/Elements/Button';
import { Form } from '@/components/Form';
import NEXT_ROUTES from '@/constants/routes';
import { useAuth } from '@/hooks/useAuth';
import { useSubmissionHandler } from '@/hooks/useSubmissionHandler';
import { emitSuccess } from '@/utils/toasts';
import router from 'next/router';
import { UpdateProfileValues, updateProfile } from '../../api/update';
import { updateSchema } from '../../schemas/update';
import { LocationFormField } from './LocationFormField';
import { PhoneFormField } from './PhoneFormField';

type CompleteOnboardingFormProps = {
  className?: string;
};

const redirectAndNotify = async () => {
  await router.push(NEXT_ROUTES.MY_PROFILE);
  emitSuccess({
    title: 'Perfil actualizado',
    message: 'Has actualizado tu perfil correctamente',
  });
};

export const CompleteOnboardingForm = ({
  className,
}: CompleteOnboardingFormProps) => {
  const { user } = useAuth();
  const [handleUpdateProfile, isSubmitting] = useSubmissionHandler(
    updateProfile,
    {
      onSuccess: redirectAndNotify,
    }
  );

  if (!user) return <>Loading...</>;
  return (
    <Form<UpdateProfileValues, typeof updateSchema>
      onSubmit={handleUpdateProfile}
      schema={updateSchema}
      className={className}
    >
      {({ control, watch }) => {
        return (
          <>
            <div>
              {!user.location && (
                <div className="mt-8">
                  <h2 className="mb-2 text-2xl font-semibold">
                    Añade tu ubicación
                  </h2>
                  <LocationFormField control={control} watch={watch} />
                  <p className="text-sm text-gray">
                    Sólo utilizaremos tu ubicación para mostrarte productos
                    cerca de tí y para ubicar tus productos en venta. No
                    venderemos tus datos a terceros.
                  </p>
                </div>
              )}
              {!user.phone && (
                <div className="mt-8">
                  <h2 className="mb-2 text-2xl font-semibold">
                    Añade tu teléfono
                  </h2>
                  <PhoneFormField control={control} />
                  <p className="text-sm text-gray">
                    Sólo utilizaremos tu número para enviarte notificaciones
                    importantes mediante SMS si nos autorizas.
                  </p>
                </div>
              )}
            </div>
            <Button disabled={isSubmitting} type="submit" className="w-full">
              GUARDAR
            </Button>
          </>
        );
      }}
    </Form>
  );
};
