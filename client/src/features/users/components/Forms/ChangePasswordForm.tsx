import { Button } from '@/components/Elements/Button';
import { Form, PasswordField } from '@/components/Form';
import NEXT_ROUTES from '@/constants/routes';
import { useSubmissionHandler } from '@/hooks/useSubmissionHandler';
import { emitSuccess } from '@/utils/toasts';
import router from 'next/router';
import { ChangePasswordValues, changePassword } from '../../api/changePassword';
import { changePasswordSchema } from '../../schemas/changePassword';

type ChangePasswordFormProps = {
  className?: string;
};

const redirectAndNotify = async () => {
  await router.push(NEXT_ROUTES.MY_PROFILE);
  emitSuccess({
    message: 'Has actualizado tu contraseña correctamente',
  });
};

export const ChangePasswordForm = ({ className }: ChangePasswordFormProps) => {
  const [handleChangePassword, isSubmitting] = useSubmissionHandler(
    changePassword,
    {
      onSuccess: redirectAndNotify,
    }
  );

  return (
    <Form<ChangePasswordValues, typeof changePasswordSchema>
      onSubmit={handleChangePassword}
      schema={changePasswordSchema}
      className={className}
    >
      {({ register, formState }) => {
        return (
          <>
            <div className="mt-8 flex flex-col space-y-3">
              <PasswordField
                label="Nueva contraseña"
                inputProps={{
                  placeholder: '●●●●●●●●●●●●●',
                  autoComplete: 'new-password',
                }}
                error={formState.errors['new_password1']}
                registration={register('new_password1')}
              />
              <PasswordField
                label="Confirma la contraseña"
                inputProps={{
                  placeholder: '●●●●●●●●●●●●●',
                  autoComplete: 'new-password',
                }}
                error={formState.errors['new_password2']}
                registration={register('new_password2')}
              />
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
