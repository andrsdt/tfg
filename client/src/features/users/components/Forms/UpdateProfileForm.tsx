import { Button } from '@/components/Elements/Button';
import { Form, InputField } from '@/components/Form';
import NEXT_ROUTES from '@/constants/routes';
import { useAuth } from '@/hooks/useAuth';
import { useSubmissionHandler } from '@/hooks/useSubmissionHandler';
import { emitSuccess } from '@/utils/toasts';
import router from 'next/router';
import { UpdateProfileValues, updateProfile } from '../../api/update';
import { updateSchema } from '../../schemas/update';
import { LocationFormField } from './LocationFormField';
import { PhoneFormField } from './PhoneFormField';
import {
  formatCoordinatesAsWKT,
  transformLocationToCoordinates,
} from '@/utils/formatters';
import { AvatarFormField } from './AvatarFormField';

type UpdateProfileFormProps = {
  className?: string;
};

const redirectAndNotify = async () => {
  await router.push(NEXT_ROUTES.MY_PROFILE);
  emitSuccess({
    title: 'Perfil actualizado',
    message: 'Has actualizado tu perfil correctamente',
  });
};

export const UpdateProfileForm = ({ className }: UpdateProfileFormProps) => {
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
      defaults={{
        first_name: user.first_name,
        last_name: user.last_name,
        photo: undefined,
        phone: user.phone,
        location: formatCoordinatesAsWKT(
          transformLocationToCoordinates(user.location)
        ),
      }}
    >
      {({ control, watch, register, setValue, formState }) => {
        return (
          <>
            <div>
              <AvatarFormField setValue={setValue} user={user} />
              <div className="mt-8 flex">
                <InputField
                  type="text"
                  label="Nombre"
                  inputProps={{
                    placeholder: 'Chiquito',
                    autoComplete: 'given-name',
                  }}
                  error={formState.errors['first_name']}
                  registration={register('first_name')}
                  className="w-1/2 pr-4"
                />
                <InputField
                  type="text"
                  label="Apellidos"
                  inputProps={{
                    placeholder: 'De la Calzada',
                    autoComplete: 'family-name',
                  }}
                  error={formState.errors['last_name']}
                  registration={register('last_name')}
                  className="w-1/2"
                />
              </div>
              <div className="mt-8">
                <LocationFormField control={control} watch={watch} />
                <p className="text-sm text-gray">
                  Sólo utilizaremos tu ubicación para mostrarte productos cerca
                  de tí y para ubicar tus productos en venta. No venderemos tus
                  datos a terceros.
                </p>
                d
              </div>
              <div className="mt-8">
                <PhoneFormField control={control} defaultValue={user.phone} />
                <p className="text-sm text-gray">
                  Sólo utilizaremos tu número para enviarte notificaciones
                  importantes mediante SMS si nos autorizas.
                </p>
              </div>
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
