import NEXT_ROUTES from '@/constants/routes';
import { Order } from '@/features/orders/types/orders';
import {
  formatMoney,
  formatQuantityWithUnit,
  formatShortDate,
  shortenName,
} from '@/utils/formatters';
import Image from 'next/image';
import Link from 'next/link';

export const OrderCard = ({
  order,
  type,
}: {
  order: Order;
  type: 'SALE' | 'PURCHASE';
}) => {
  const canRate = type === 'PURCHASE' && !order.is_reviewed;
  const isSoldOutside = order.consumer === null;
  const user = type === 'SALE' ? order.consumer : order.listing.producer.user;
  const name = isSoldOutside
    ? 'Fuera de Grocerin'
    : shortenName(user.first_name, user.last_name);
  return (
    <Link
      className="flex w-full space-x-3"
      href={
        canRate
          ? NEXT_ROUTES.RATE_ORDER(order.id)
          : NEXT_ROUTES.DETAILS_LISTING(order.listing.id)
      }
    >
      <Image
        src={order.listing.images[0]?.image}
        width={80}
        height={60}
        className="aspect-[8/7] h-[4.5rem] w-20 rounded-lg object-cover"
        alt="Imagen del producto"
      />
      <div className="grid w-full grid-rows-2 space-y-1">
        <div className="flex justify-between text-2xl font-bold">
          <p>{order.listing.title}</p>
          <p>{formatMoney(order.total_price)}</p>
        </div>
        <div className="flex justify-between space-x-2 truncate text-gray">
          <p className="truncate">
            {name} &middot; {formatShortDate(order.created_at)}
          </p>
          <p>{formatQuantityWithUnit(order.quantity, order.listing.unit)}</p>
        </div>
      </div>
    </Link>
  );
};
