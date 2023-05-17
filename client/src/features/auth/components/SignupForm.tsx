import { Button } from '@/components/Elements/Button';
import { Form, InputField, PasswordField } from '@/components/Form';
import NEXT_ROUTES from '@/constants/routes';
import { useAuth } from '@/hooks/useAuth';
import { useSubmissionHandler } from '@/hooks/useSubmissionHandler';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import * as z from 'zod';

const lettersOnly = /^[A-zÀ-ÖØ-öø-ÿ]+( ?[A-zÀ-ÖØ-öø-ÿ]+)?$/;

const schema = z.object({
  email: z.string().email('La dirección de correo electrónico no es válida'),
  password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'),
  // FirstName can't have numbers
  firstName: z.string().min(2, ' ').regex(lettersOnly, ' '),
  lastName: z.string().min(2, ' ').regex(lettersOnly, ' '),
});

type SignupValues = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

type SignupFormProps = {
  className?: string;
};

export const SignupForm = ({ className }: SignupFormProps) => {
  const { signup } = useAuth();
  const router = useRouter();
  const [handleSignup, isSubmitting] = useSubmissionHandler(signup, {
    onSuccess: () => router.push(NEXT_ROUTES.COMPLETE_ONBOARDING),
  });

  return (
    <Form<SignupValues, typeof schema> onSubmit={handleSignup} schema={schema}>
      {({ register, formState }) => {
        return (
          <div className={clsx('space-y-8', className)}>
            <InputField
              type="email"
              label="Correo electrónico"
              inputProps={{
                placeholder: 'example@test.com',
                autoComplete: 'email',
              }}
              error={formState.errors['email']}
              registration={register('email')}
            />
            <div className="flex">
              <InputField
                type="text"
                label="Nombre"
                inputProps={{
                  placeholder: 'Chiquito',
                  autoComplete: 'given-name',
                }}
                error={formState.errors['firstName']}
                registration={register('firstName')}
                className="w-1/2 pr-4"
              />
              <InputField
                type="text"
                label="Apellidos"
                inputProps={{
                  placeholder: 'De la Calzada',
                  autoComplete: 'family-name',
                }}
                error={formState.errors['lastName']}
                registration={register('lastName')}
                className="w-1/2"
              />
            </div>
            <PasswordField
              label="Contraseña"
              inputProps={{
                placeholder: '●●●●●●●●●●●●●',
                autoComplete: 'new-password',
              }}
              error={formState.errors['password']}
              registration={register('password')}
            />
            <Button
              disabled={isSubmitting}
              type="submit"
              className="w-full px-8"
            >
              REGISTRARSE
            </Button>
          </div>
        );
      }}
    </Form>
  );
};
