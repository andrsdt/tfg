import { Button } from '@/components/Elements/Button';
import { Form, InputField, PasswordField } from '@/components/Form';
import { useAuth } from '@/hooks/useAuth';
import { useSubmissionHandler } from '@/hooks/useSubmissionHandler';
import clsx from 'clsx';
import * as z from 'zod';

const schema = z.object({
  email: z.string().email('La dirección de correo electrónico no es válida'),
  password: z.string().min(1, 'Introduce tu contraseña'),
});

type LoginValues = {
  email: string;
  password: string;
};

type LoginFormProps = {
  className?: string;
};

export const LoginForm = ({ className }: LoginFormProps) => {
  const { login } = useAuth();
  const [handleLogin, isSubmitting] = useSubmissionHandler(login);

  return (
    <Form<LoginValues, typeof schema> onSubmit={handleLogin} schema={schema}>
      {({ register, formState }) => {
        return (
          <div className={clsx('space-y-8', className)}>
            <InputField
              type="email"
              label="Email Address"
              inputProps={{
                placeholder: 'example@test.com',
                autoComplete: 'email',
              }}
              error={formState.errors['email']}
              registration={register('email')}
            />
            <PasswordField
              label="Password"
              inputProps={{
                placeholder: '●●●●●●●●●●●●●',
                autoComplete: 'current-password',
              }}
              error={formState.errors['password']}
              registration={register('password')}
            />
            <Button
              disabled={isSubmitting}
              type="submit"
              className="w-full px-8"
            >
              INICIAR SESIÓN
            </Button>
          </div>
        );
      }}
    </Form>
  );
};
