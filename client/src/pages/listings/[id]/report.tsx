import { BackButton, Button, CustomListbox } from '@/components/Elements';
import { TextAreaField } from '@/components/Form';
import { BaseLayout } from '@/components/Layouts';
import { ROLES } from '@/constants/roles';
import NEXT_ROUTES from '@/constants/routes';
import { retrieveListing } from '@/features/listings/api/retrieve';
import { Listing } from '@/features/listings/types/listings';
import { useAuth } from '@/hooks/useAuth';
import { useRetrieveHandler } from '@/hooks/useRetrieveHandler';
import router from 'next/router';
import { useState } from 'react';

export const getServerSideProps = async ({ params }) => {
  return {
    props: {
      id: params.id,
    },
  };
};

type ReportListingProps = {
  pageProps: {
    id: string;
  };
};

const options = [
  { identifier: 'PRODUCER', translation: 'El productor' },
  { identifier: 'PRODUCT', translation: 'El producto' },
  { identifier: 'ORDER', translation: 'Mi pedido' },
];

const ReportListing = ({ pageProps }: ReportListingProps) => {
  const { id } = pageProps;
  useAuth({ roles: [ROLES.PRODUCER] });
  // TODO: auth check for producer who owns listing
  const [selected, setSelected] = useState(options[0]);
  const [listing] = useRetrieveHandler<Listing, Listing>(
    () => retrieveListing(id),
    {
      onError: () => router.replace(NEXT_ROUTES.HOME),
    }
  );
  // const [handleReportListing, isSubmitting] =
  //   useSubmissionHandler(reportListing, {
  //     onSuccess: redirectAndNotify,
  //   });

  if (!listing) return <>Loading...</>;

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
        <h2 className="text-xl font-semibold">He tenido un problema con...</h2>
        <CustomListbox
          value={selected}
          setValue={setSelected}
          options={options}
          className="z-50 mt-4 w-1/2"
        />
        <h2 className="mt-4 text-xl font-semibold">
          Resume brevemente el problema
        </h2>
        <TextAreaField
          registration={undefined}
          inputClassName="mt-2 min-h-[20rem]"
        />
      </div>
      <Button className="w-full" type="submit">
        ENVIAR
      </Button>
    </BaseLayout>
  );
};

export default ReportListing;
