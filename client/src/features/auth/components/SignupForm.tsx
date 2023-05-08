import { Button } from '@/components/Elements/Button';
import { Form, InputField, PasswordField } from '@/components/Form';
import { useAuth } from '@/hooks/useAuth';
import clsx from 'clsx';
import { useEffect } from 'react';
import { useFormState } from 'react-hook-form';
import * as z from 'zod';

const lettersOnly = /^[A-zÀ-ÖØ-öø-ÿ]+( ?[\\w]+)?$/;

const schema = z.object({
  email: z.string().email('La dirección de correo electrónico no es válida'),
  password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'),
  // FirstName can't have numbers
  firstName: z.string().regex(lettersOnly, ' '),
  lastName: z.string().regex(lettersOnly, ' '),
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
  return (
    <Form<SignupValues, typeof schema> onSubmit={signup} schema={schema}>
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
            <Button type="submit" className="w-full">
              REGISTRARSE
            </Button>
          </div>
        );
      }}
    </Form>
  );
};
