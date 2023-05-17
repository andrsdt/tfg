import { Button } from '@/components/Elements/Button';
import { Form } from '@/components/Form';
import { WithUnitField } from '@/components/Form/WithUnitField';
import { ROLES } from '@/constants/roles';
import NEXT_ROUTES from '@/constants/routes';
import { useAuth } from '@/hooks/useAuth';
import { useSubmissionHandler } from '@/hooks/useSubmissionHandler';
import { emitSuccess } from '@/utils/notifications';
import { MapPinIcon, PhoneIcon } from '@heroicons/react/24/solid';
import router from 'next/router';
import { Controller } from 'react-hook-form';
import PhoneInput from 'react-phone-input-2';
import * as z from 'zod';
import { updateProfile } from '../../api/update';

const schema = z.object({
  phone: z.optional(z.string()),
  // .min(9, { message: 'El teléfono debe tener 9 dígitos' }),
  location: z.optional(z.string()),
  // .nonempty({ message: 'La ubicación es obligatoria' }),
});

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
  const { user } = useAuth({ roles: [ROLES.HAS_NOT_COMPLETED_ONBOARDING] });
  const [handleUpdateProfile, isSubmitting] = useSubmissionHandler(
    updateProfile,
    {
      onSuccess: redirectAndNotify,
    }
  );

  if (!user) return <>Loading...</>;
  return (
    <Form<UpdateProfileValues, typeof schema>
      onSubmit={handleUpdateProfile}
      schema={schema}
      className={className}
    >
      {({ register, formState, control }) => {
        return (
          <>
            <div>
              {!user.location && (
                <div className="mt-8">
                  <h2 className="mb-2 text-2xl font-semibold">
                    Añade tu ubicación
                  </h2>
                  <WithUnitField
                    className="h-14"
                    unit={<MapPinIcon className="w-6" />}
                  >
                    <input
                      className="h-full min-w-full px-2 text-xl outline-none"
                      {...register('location')}
                    />
                  </WithUnitField>
                  <p className="text-sm text-gray">
                    Sólo utilizaremos tu ubicación para mostrarte productos
                    cerca de tí y para ubicar tus productos en venta. No
                    compartiremos tus datos con terceros.
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
                    importantes mediante SMS
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
