import { Button } from '@/components/Elements/Button';
import { Form, InputField, PasswordField } from '@/components/Form';
import { useAuth } from '@/hooks/useAuth';
import clsx from 'clsx';
import * as z from 'zod';

const schema = z.object({
  email: z.string().min(1, 'Required'),
  password: z.string().min(1, 'Required'),
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

  return (
    <Form<LoginValues, typeof schema> onSubmit={login} schema={schema}>
      {({ register, formState }) => {
        return (
          <div className={clsx('space-y-8', className)}>
            <InputField
              type="email"
              label="Email Address"
              autocomplete="email"
              error={formState.errors['email']}
              registration={register('email')}
            />
            <PasswordField
              label="Password"
              autocomplete="current-password"
              error={formState.errors['password']}
              registration={register('password')}
            />
            <Button
              disabled={formState.isSubmitting}
              type="submit"
              className="w-full"
            >
              INICIAR SESIÓN
            </Button>
          </div>
        );
      }}
    </Form>
  );
};
