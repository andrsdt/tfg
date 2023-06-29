import { BackButton } from '@/components/Elements';
import { BaseLayout } from '@/components/Layouts';
import { ROLES } from '@/constants/roles';
import NEXT_ROUTES from '@/constants/routes';
import { sendReport } from '@/features/reports/api/create';
import { ReportForm } from '@/features/reports/components/Form';
import { createReportSchema } from '@/features/reports/schemas/create';
import { useAuth } from '@/hooks/useAuth';
import { useSubmissionHandler } from '@/hooks/useSubmissionHandler';
import { emitSuccess } from '@/utils/toasts';
import router from 'next/router';

const redirectAndNotify = async () => {
  await router.push(NEXT_ROUTES.HOME);
  emitSuccess({
    title: 'Denuncia recibida',
    message:
      'Hemos recibido tu denuncia y nos pondremos en contacto contigo lo antes posible.',
  });
};

export const getServerSideProps = async ({ params }) => {
  return {
    props: {
      id: params.id,
    },
  };
};

type ReportOrderProps = {
  pageProps: {
    id: string;
  };
};

const ReportOrder = ({ pageProps }: ReportOrderProps) => {
  const { id } = pageProps;
  useAuth({ roles: [ROLES.AUTHENTICATED] });
  const [handleSubmitReport, isSubmitting] = useSubmissionHandler(sendReport, {
    onSuccess: redirectAndNotify,
  });

  return (
    <BaseLayout className="flex flex-col justify-between p-4">
      <div>
        <span className="mb-6 flex h-min items-center space-x-3">
          <BackButton
            className="h-8 w-8"
            href={NEXT_ROUTES.DETAILS_LISTING(id)}
          />
          <h1 className="text-3xl font-bold">Cuéntanos tu problema</h1>
        </span>
        <h2 className="mt-4 text-xl font-semibold">
          ¿Qué ha ocurrido con tu pedido?
        </h2>
        <ReportForm
          isSubmitting={isSubmitting}
          onSubmit={handleSubmitReport}
          schema={createReportSchema}
          defaults={{
            target: 'ORDER',
            description: '',
            order: id ? Number.parseInt(id) : undefined,
            reported: undefined, // autofilled in backend
          }}
        />
      </div>
    </BaseLayout>
  );
};

export default ReportOrder;
