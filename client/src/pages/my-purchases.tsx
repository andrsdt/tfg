import { CloseButton } from '@/components/Elements';
import { BaseLayout } from '@/components/Layouts';
import { ROLES } from '@/constants/roles';
import { listOrders } from '@/features/orders/api/list';
import { OrdersList } from '@/features/orders/components/OrdersList';
import { Order } from '@/features/orders/types/orders';
import { useAuth } from '@/hooks/useAuth';
import { useRetrieveHandler } from '@/hooks/useRetrieveHandler';

const MyPurchases = () => {
  useAuth({ roles: [ROLES.AUTHENTICATED] });
  const [purchases] = useRetrieveHandler<Order[], Order[]>(() =>
    listOrders({
      role: 'CONSUMER',
    })
  );

  return (
    <BaseLayout className="p-4">
      <span className="mb-4 flex h-min justify-between">
        <h1 className="text-3xl font-bold">Mis compras</h1>
        <CloseButton />
      </span>
      <OrdersList orders={purchases} type="PURCHASE" />
    </BaseLayout>
  );
};

export default MyPurchases;
