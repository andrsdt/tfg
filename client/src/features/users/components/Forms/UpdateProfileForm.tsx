import { Button } from '@/components/Elements/Button';
import { Form } from '@/components/Form';
import { LocationAutocompleteField } from '@/components/Form/LocationAutocompleteField';
import { WithUnitField } from '@/components/Form/WithUnitField';
import Map from '@/components/Map/Map';
import NEXT_ROUTES from '@/constants/routes';
import { useAuth } from '@/hooks/useAuth';
import { useSubmissionHandler } from '@/hooks/useSubmissionHandler';
import { formatWKTAsCoordinates } from '@/utils/formatters';
import { emitSuccess } from '@/utils/toasts';
import { MapPinIcon, PhoneIcon } from '@heroicons/react/24/solid';
import router from 'next/router';
import { Controller } from 'react-hook-form';
import PhoneInput from 'react-phone-input-2';
import { updateProfile } from '../../api/update';
import { updateSchema } from '../../schemas/update';

type UpdateProfileValues = {
  phone: string;
  location: string;
};

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
                  <WithUnitField
                    className="h-14 w-full"
                    unit={<MapPinIcon className="w-6" />}
                  >
                    <Controller
                      control={control}
                      name="location"
                      defaultValue=""
                      render={({ field: { onChange } }) => (
                        <LocationAutocompleteField
                          className="w-full px-2 text-xl outline-none"
                          inputProps={{
                            className: 'text-xl outline-none',
                          }}
                          onChange={onChange}
                        />
                      )}
                    />
                  </WithUnitField>
                  <Map
                    center={formatWKTAsCoordinates(watch('location'))}
                    className="my-2 h-48 w-full rounded-full"
                  />
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
                  <WithUnitField
                    className="h-14"
                    unit={<PhoneIcon className="w-6" />}
                  >
                    <Controller
                      name="phone"
                      control={control}
                      defaultValue=""
                      render={({ field: { onChange, value } }) => (
                        <PhoneInput
                          inputClass="h-full text-2xl"
                          placeholder="666 123 456"
                          country="es"
                          countryCodeEditable={false}
                          disableDropdown={true}
                          value={value}
                          onChange={onChange}
                        />
                      )}
                    />
                  </WithUnitField>
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

// const values = {...register('phone')}
// values.
// return (
//   <div className={clsx('space-y-8', className)}>
//     <WithUnitField
//       unit={<PhoneIcon className="w-6" />}
//       className="h-12 w-min"
//       error={formState.errors['phone']}
//     >
// <Controller
//   name="phone"
//   control={control}
//   defaultValue=""
//   render={({ field: { onChange, value } }) => (
//     <PhoneInput
//       inputClass="h-full text-2xl"
//       placeholder="666 123 456"
//       country="es"
//       countryCodeEditable={false}
//       disableDropdown={true}
//       value={value}
//       onChange={onChange}
//     />
//   )}
// />
//     </WithUnitField>
//     <Button disabled={isSubmitting} type="submit" className="w-full">
//       GUARDAR
//     </Button>
//   </div>
// );
