import { Button } from '@/components/Elements/Button';
import { Form, TextAreaField } from '@/components/Form';
import NEXT_ROUTES from '@/constants/routes';
import { useAuth } from '@/hooks/useAuth';
import { useSubmissionHandler } from '@/hooks/useSubmissionHandler';
import { emitSuccess } from '@/utils/toasts';
import router from 'next/router';
import { updateSchema } from '../schemas/update';
import { useRetrieveProducer } from '../api/retrieve';
import { UpdateProducerValues, updateProducer } from '../api/update';

type UpdateProducerFormProps = {
  className?: string;
};

const redirectAndNotify = async () => {
  await router.push(NEXT_ROUTES.MY_PROFILE);
  emitSuccess({
    title: 'Perfil actualizado',
    message: 'Has actualizado tu perfil de productor correctamente',
  });
};

export const UpdateProducerForm = ({ className }: UpdateProducerFormProps) => {
  const { user } = useAuth();
  const { producer } = useRetrieveProducer(user?.pk.toString());
  const [handleUpdateProducer, isSubmitting] = useSubmissionHandler(
    updateProducer,
    {
      onSuccess: redirectAndNotify,
    }
  );

  if (!user || !producer) return <>Loading...</>;

  return (
    <Form<UpdateProducerValues, typeof updateSchema>
      onSubmit={async (data) =>
        await handleUpdateProducer({ id: user.pk }, data)
      }
      schema={updateSchema}
      className={className}
      defaults={{
        biography: producer.biography,
      }}
    >
      {({ register, formState }) => {
        return (
          <>
            <div className="mt-4 flex">
              <TextAreaField
                error={formState.errors['biography']}
                registration={register('biography')}
                className="w-full pr-4"
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
