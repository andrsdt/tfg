import { BackButton } from '@/components/Elements';
import { BaseLayout } from '@/components/Layouts';
import { ROLES } from '@/constants/roles';
import NEXT_ROUTES from '@/constants/routes';
import { UpdateProducerForm } from '@/features/producers/Forms/UpdateProducerForm';
import { useAuth } from '@/hooks/useAuth';

const EditProducer = () => {
  const { user } = useAuth({ roles: [ROLES.PRODUCER] });

  if (!user) return <></>;

  return (
    <BaseLayout className="p-4">
      <span className="mb-4 flex h-min items-center space-x-3">
        <BackButton className="h-8 w-8" href={NEXT_ROUTES.MY_PROFILE} />
        <h1 className="text-3xl font-bold">Edita tu biografía</h1>
      </span>
      <UpdateProducerForm className="flex h-full flex-col justify-between" />
    </BaseLayout>
  );
};

export default EditProducer;
