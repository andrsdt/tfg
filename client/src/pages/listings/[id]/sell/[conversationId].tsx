import { BackButton, Button } from '@/components/Elements';
import { Form } from '@/components/Form';
import { WithUnitField } from '@/components/Form/WithUnitField';
import { BaseLayout } from '@/components/Layouts';
import { ROLES } from '@/constants/roles';
import NEXT_ROUTES from '@/constants/routes';
import { listConversationsFromListing } from '@/features/chats/api/listFromListing';
import { ConversationListItem } from '@/features/chats/components/ConversationListItem';
import { ConversationPreview } from '@/features/chats/types/conversations';
import { retrieveListing } from '@/features/listings/api/retrieve';
import { Listing } from '@/features/listings/types/listings';
import { UNITS } from '@/features/listings/types/units';
import { createOrder } from '@/features/orders/api/create';
import { Avatar } from '@/features/users/components/Avatar';
import { BasicUser } from '@/features/users/types/users';
import { useAuth } from '@/hooks/useAuth';
import { useRetrieveHandler } from '@/hooks/useRetrieveHandler';
import { useSubmissionHandler } from '@/hooks/useSubmissionHandler';
import { parseMoneyString } from '@/utils/formatters';
import { emitSuccess } from '@/utils/toasts';
import Image from 'next/image';
import router from 'next/router';
import CurrencyInput from 'react-currency-input-field';
import { z } from 'zod';

export const getServerSideProps = async ({ params }) => {
  return {
    props: {
      id: params.id,
      conversationId: params.conversationId,
    },
  };
};

type MarkListingAsSoldToUserProps = {
  pageProps: {
    id: string;
    // A listing can be marked as sold to a user
    // when they have had a conversation about it.
    // If the producer wants to mark the listing as
    // sold to an external user, the conversationId
    // will be 'external' as it can't be null
    conversationId: string | 'external';
  };
};

const redirectToHome = () => router.replace(NEXT_ROUTES.HOME);

const MarkListingAsSoldToUser = ({
  pageProps,
}: MarkListingAsSoldToUserProps) => {
  const { id, conversationId } = pageProps;
  const isExternalSell = conversationId === 'external';
  useAuth({ roles: [ROLES.PRODUCER] });

  // TODO: auth check for producer who owns listing

  const [listing] = useRetrieveHandler<Listing, Listing>(
    () => retrieveListing(id),
    { onError: redirectToHome }
  );

  const [buyerConversation] = useRetrieveHandler<
    ConversationPreview[],
    ConversationPreview
  >(() => listConversationsFromListing(isExternalSell ? undefined : id), {
    transform: async (conversations) =>
      conversations?.find((c) => c.id.toString() === conversationId),
    onError: redirectToHome,
  });

  return (
    <BaseLayout className="flex h-full flex-col p-4">
      <span className="mb-3 flex h-min items-center space-x-3">
        <BackButton
          className="h-8 w-8"
          href={NEXT_ROUTES.MARK_SOLD_LISTING(id)}
        />
        <h1 className="text-3xl font-bold">He realizado una venta</h1>
      </span>
      <p className="mb-3 text-xl">
        Introduce la <b className="text-green">cantidad</b> y el{' '}
        <b className="text-green">precio total</b> de la venta y confirma que
        esté todo correcto:
      </p>
      {isExternalSell ? (
        <span className="flex w-full space-x-3 rounded-xl border border-light-gray p-3">
          <Avatar className="h-16 w-16" src={undefined} />
          <div>
            <p className="text-xl font-semibold">Usuario externo</p>
            <i>Usuario que no pertenece a Grocerin</i>
          </div>
        </span>
      ) : (
        buyerConversation && (
          <ConversationListItem
            conversation={buyerConversation}
            className="rounded-xl border border-light-gray p-3"
            mini
          />
        )
      )}
      {listing && (
        <MarkListingAsSoldForm
          listing={listing}
          consumer={buyerConversation?.consumer}
        />
      )}
    </BaseLayout>
  );
};

export default MarkListingAsSoldToUser;

export type MarkAsSoldValues = {
  quantity: number;
  total_price: number;
  listing_id: number;
  consumer_id: number;
};

const markAsSoldSchema = z.object({
  quantity: z
    .number({
      invalid_type_error: '',
    })
    .min(1, 'Debes vender al menos 1 producto')
    .max(10000, 'No puedes vender más de 10.000 productos'),
  total_price: z.preprocess(
    parseMoneyString,
    z
      .number({
        invalid_type_error: '',
      })
      .min(0, 'El precio no puede ser negativo')
      .max(100000, 'No puedes vender productos de más de 1000€')
  ),
  listing_id: z.number(),
  consumer_id: z.optional(z.number()),
});

type MarkListingAsSoldFormProps = {
  listing: Listing;
  consumer: BasicUser;
};

const redirectAndNotify = async (listingId: number | string) => {
  await router.push(NEXT_ROUTES.DETAILS_LISTING(listingId));
  emitSuccess({
    title: 'Venta registrada',
    message: 'Has registrado la venta correctamente',
  });
};

const MarkListingAsSoldForm = ({
  listing,
  consumer,
}: MarkListingAsSoldFormProps) => {
  const [handleCreateOrder, isSubmitting] = useSubmissionHandler(createOrder, {
    onSuccess: async () => await redirectAndNotify(listing.id),
  });
  const defaults = {
    quantity: undefined,
    total_price: undefined,
    listing_id: listing.id,
    consumer_id: consumer?.id,
  };

  return (
    <Form<MarkAsSoldValues, typeof markAsSoldSchema>
      className="h-full"
      onSubmit={handleCreateOrder}
      schema={markAsSoldSchema}
      defaults={defaults}
    >
      {({ register, formState, watch }) => {
        const hasOneQuantity = watch('quantity') === 1;
        const unit = UNITS[listing.unit];
        return (
          <div className="flex h-full flex-col justify-between">
            <span className="mt-4 flex w-full justify-between divide-x divide-light-gray rounded-lg p-3 outline outline-1 outline-light-gray">
              <div className="pr-4">
                <h1 className="mb-1 text-xl font-bold">{listing.title}</h1>
                <Image
                  src={listing.images[0].image}
                  alt="Imagen del producto"
                  width={250}
                  height={150}
                  className="aspect-[5/3] rounded-lg object-cover"
                />
              </div>
              <div className="pl-4 text-end">
                <p className="mb-1 text-xl font-bold">Cantidad</p>
                {/* TODO: use the new formatter formatQuantityWithUnit() */}
                <WithUnitField
                  unit={
                    hasOneQuantity
                      ? unit.translationShort
                      : unit.translationShortPlural
                  }
                  className="h-12 w-min"
                  labelClassName="w-16"
                  error={formState.errors['quantity']}
                >
                  <input
                    type="number"
                    // min={1}
                    step={1}
                    // max={10000}
                    className="w-24 text-center outline-none"
                    {...register('quantity', { valueAsNumber: true })}
                  />
                </WithUnitField>
                <p className="mb-1 text-xl font-bold">Precio total</p>
                <WithUnitField
                  unit="€"
                  className="h-12"
                  labelClassName="w-16 justify-end"
                  error={formState.errors['total_price']}
                >
                  <CurrencyInput
                    className="w-24 text-center outline-none"
                    allowNegativeValue={false}
                    min={0}
                    max={10000}
                    decimalSeparator=","
                    groupSeparator="."
                    // value={watch('total_price')}
                    {...register('total_price')}
                  />
                </WithUnitField>
              </div>
            </span>
            <Button type="submit" disabled={isSubmitting} className="mt-4">
              CONFIRMAR
            </Button>
          </div>
        );
      }}
    </Form>
  );
};
