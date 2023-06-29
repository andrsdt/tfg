import { Button, CloseButton } from '@/components/Elements';
import { Form, TextAreaField } from '@/components/Form';
import { BaseLayout } from '@/components/Layouts';
import { ROLES } from '@/constants/roles';
import NEXT_ROUTES from '@/constants/routes';
import { retrieveOrder } from '@/features/orders/api/retrieve';
import { Order } from '@/features/orders/types/orders';
import { Avatar } from '@/features/users/components/Avatar';
import { useAuth } from '@/hooks/useAuth';
import { useRetrieveHandler } from '@/hooks/useRetrieveHandler';
import { shortenName } from '@/utils/formatters';
import Image from 'next/image';
import Link from 'next/link';
import router from 'next/router';
import { Controller } from 'react-hook-form';
import { useSubmissionHandler } from '@/hooks/useSubmissionHandler';
import { createReview } from '@/features/reviews/api/create';
import { emitSuccess } from '@/utils/toasts';
import { Stars } from '@/features/reviews/components/Stars';
import { createReviewSchema } from '@/features/reviews/schemas/create';

export const getServerSideProps = async ({ params }) => {
  return {
    props: {
      id: params.id,
    },
  };
};

type RateOrderProps = {
  pageProps: {
    id: string;
  };
};

export type ReviewListingValues = {
  rating: number;
  comment: string;
  order: number;
};

const redirectAndNotify = async () => {
  emitSuccess({
    title: 'Reseña enviada',
    message: 'Hemos recibido tu reseña, ¡Gracias!',
  });
  await router.replace(NEXT_ROUTES.HOME);
};

const RateOrder = ({ pageProps }: RateOrderProps) => {
  const { id } = pageProps;
  useAuth({ roles: [ROLES.AUTHENTICATED] });
  const [order] = useRetrieveHandler<Order, Order>(() => retrieveOrder(id), {
    onError: async () => await router.replace(NEXT_ROUTES.HOME),
  });

  const [handleCreateReview, isSubmitting] = useSubmissionHandler(
    createReview,
    {
      onSuccess: async () => await redirectAndNotify(),
    }
  );

  if (!order) return <>Loading...</>;
  const producer = order.listing.producer.user;
  return (
    <BaseLayout className="flex h-full flex-col items-center p-8">
      <span className="mb-14 flex h-min w-full justify-between">
        <h1 className="text-3xl font-bold">Valora tu compra</h1>
        <CloseButton />
      </span>

      <div className="flex flex-col items-center justify-start">
        <div className="relative">
          <Link href={NEXT_ROUTES.PRODUCER_PROFILE(producer.id)}>
            <Avatar
              className="absolute -left-8 -top-8 h-16 w-16 outline outline-8 outline-white"
              src={producer.photo}
              alt="Foto del productor"
            />
          </Link>
          <Link href={NEXT_ROUTES.DETAILS_LISTING(order.listing.id)}>
            <Image
              className="aspect-[5/4] rounded-lg object-cover"
              src={order.listing.images[0].image}
              alt="Foto del producto"
              width={300}
              height={240}
            />
            <h1 className="mt-2 text-center text-3xl font-bold text-black">
              {order.listing.title}
            </h1>
            <p className="mb- text-center text-gray opacity-80">
              Producto de {shortenName(producer.first_name, producer.last_name)}
            </p>
          </Link>
        </div>
      </div>
      <Form<ReviewListingValues, typeof createReviewSchema>
        onSubmit={handleCreateReview}
        schema={createReviewSchema}
        defaults={{ order: order.id, rating: 3, comment: '' }}
        className="h-full"
      >
        {({ register, formState, control }) => {
          return (
            <div className="my-4 flex h-full flex-col justify-between">
              <div className="flex h-full flex-col justify-around">
                <Controller
                  name="rating"
                  control={control}
                  defaultValue={0}
                  render={({ field }) => (
                    <Stars
                      value={field.value}
                      setValue={(value) => field.onChange(value)}
                      className="w-full justify-center space-x-5"
                    />
                  )}
                />
                <TextAreaField
                  className="my-4 w-full"
                  registration={register('comment')}
                  error={formState.errors['comment']}
                  inputProps={{
                    placeholder:
                      'Deja un comentario sobre el producto... (opcional)',
                  }}
                />
              </div>
              <div className="w-full text-center">
                <Link
                  href={NEXT_ROUTES.REPORT_ORDER(id)}
                  className="text-sm text-red sm:text-lg"
                >
                  ¿Has tenido algún problema? <b>Háznoslo saber</b>
                </Link>
                <Button
                  type="submit"
                  className="my-2 w-full"
                  disabled={isSubmitting}
                >
                  ENVIAR
                </Button>
              </div>
            </div>
          );
        }}
      </Form>
    </BaseLayout>
  );
};

export default RateOrder;
