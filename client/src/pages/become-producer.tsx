import { BackButton } from '@/components/Elements/Button';
import { BaseLayout } from '@/components/Layouts';
import { ROLES } from '@/constants/roles';
import { useAuth } from '@/hooks/useAuth';
import { api } from '@/lib/api';
import { Client } from '@/types/openapi';
import { emitSuccess } from '@/utils/notifications';
import { HeartIcon } from '@heroicons/react/24/outline';
import { EyeIcon } from '@heroicons/react/24/solid';

const BecomeProducer = () => {
  // Only not producers can access this page
  useAuth({ roles: [ROLES.NOT_PRODUCER] });

  return (
    <BaseLayout className="flex flex-col">
      <BackButton />
      <div className="flex flex-col items-center justify-center">
        <h2 className="mb-1 mt-3 text-2xl font-bold tracking-tight text-black">
          Conviértete en productor
        </h2>
        <p className="mb-4 text-gray">
          Conviértete en productor y vende tus productos en nuestra plataforma
        </p>
        <button
          className="flex items-center justify-center space-x-2 rounded-md bg-green px-4 py-2 text-white"
          onClick={async () => {
            const client = await api.getClient<Client>();
            const response = await client.producers_create(null, {
              document: '30745287Z',
              phone: '+34666666666',
            });
            if (response?.status === 201)
              emitSuccess({
                title: '¡Enhorabuena!',
                message: 'Ya eres productor',
              });
            // client...
          }}
        >
          <HeartIcon className="h-5 w-5" />
          <span>Conviértete en productor</span>
        </button>
      </div>
      <div className="flex flex-col">
        <h2 className="mb-1 mt-3 text-2xl font-bold tracking-tight text-black">
          ¿Qué es un productor?
        </h2>
        <p className="mb-4 text-gray">
          Un productor es una persona que vende sus productos en nuestra
          plataforma
        </p>
        <button className="flex w-min items-center justify-center space-x-2 place-self-center whitespace-nowrap rounded-md bg-green px-4 py-2 text-white">
          <EyeIcon className="h-5 w-5" />
          <span>Ver productores</span>
        </button>
      </div>
    </BaseLayout>
  );
};

export default BecomeProducer;
