import { Separator } from '@/components/Elements';
import { Order } from '@/features/orders/types/orders';
import dayjs from '@/lib/dayjs';
import { capitalize } from '@/utils/formatters';
import { groupBy } from '@/utils/transformations';
import { OrderCard } from './OrdersCard';

type OrdersListProps = { orders: Order[]; type: 'SALE' | 'PURCHASE' };

export const OrdersList = ({ orders, type }: OrdersListProps) => {
  const ordersByYear = groupBy(orders, (sale) =>
    new Date(sale.created_at).getFullYear().toString()
  );

  const ordersByMonthAndYear = {};

  Object.keys(ordersByYear || {})
    .reverse()
    .forEach((year) => {
      const ordersByMonth = groupBy(ordersByYear[year], (sale) =>
        dayjs(sale.created_at).format('MMMM')
      );
      ordersByMonthAndYear[year] = ordersByMonth;
    });

  return (
    <>
      {Object.entries(ordersByMonthAndYear || {})
        ?.reverse()
        .map(([year, ordersByMonth]) => (
          <div key={year} className="mb-3">
            <h2 className="text-4xl font-extrabold">{year}</h2>
            {Object.entries((ordersByMonth as any) || {})?.map(
              ([month, orders]) => (
                <div key={`${month}/${year}`}>
                  <h3 className="mb-3 text-2xl">{capitalize(month)}</h3>
                  <div className="flex flex-col space-y-4">
                    {(orders as Order[])?.map((order) => (
                      <div key={order.id}>
                        <OrderCard order={order} type={type} />
                        <Separator />
                      </div>
                    ))}
                  </div>
                </div>
              )
            )}
          </div>
        ))}
    </>
  );
};
