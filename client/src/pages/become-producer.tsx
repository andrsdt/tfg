import { CloseButton } from '@/components/Elements/Button';
import { BaseLayout } from '@/components/Layouts';
import { ROLES } from '@/constants/roles';
import { becomeProducer } from '@/features/producers/api/create';
import { useAuth } from '@/hooks/useAuth';
import { useSubmissionHandler } from '@/hooks/useSubmissionHandler';
import { emitSuccess } from '@/utils/toasts';
import { HeartIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

const notifyAndMutate = (mutateUser: () => any) => {
  emitSuccess({
    title: 'Ya eres productor',
    message: '¡Genial! Ya eres productor',
  });
  mutateUser();
};

const BecomeProducer = () => {
  const { mutateUser } = useAuth({
    roles: [ROLES.AUTHENTICATED, ROLES.NOT_PRODUCER],
  });
  const [handleBecomeProducer] = useSubmissionHandler(becomeProducer, {
    onSuccess: async () => notifyAndMutate(mutateUser),
  });
  return (
    <BaseLayout className="p-4">
      <span className="flex h-min justify-between">
        <h1 className="text-3xl font-bold">Hazte productor</h1>
        <CloseButton />
      </span>
      <div className="flex flex-col items-center justify-center">
        <p className="mb-4 text-gray">
          Únete a ser productor y vende tus productos en nuestra plataforma
        </p>
        <button
          className="flex items-center justify-center space-x-2 rounded-md bg-green px-4 py-2 text-white"
          onClick={handleBecomeProducer}
        >
          <HeartIcon className="h-5 w-5" />
          <span>Conviértete en productor</span>
        </button>
        <p className="text-sm text-gray">
          Al convertirte en productor aceptas nuestros{' '}
          <Link href="#" className="text-green hover:underline">
            términos y condiciones
          </Link>
        </p>
      </div>
    </BaseLayout>
  );
};

export default BecomeProducer;
