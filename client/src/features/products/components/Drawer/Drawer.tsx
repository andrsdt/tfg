import { FixedDrawer, Button } from '@/components/Elements';
import { UserCard } from '@/features/users/components/Card';
import { formatMoney } from '@/utils/formatters';

type ProductDetailsDrawerProps = {
  // TODO: Add product type when it's defined
  product: any;
};

export const ProductDetailsDrawer = ({
  product,
}: ProductDetailsDrawerProps) => {
  return (
    <FixedDrawer className=" bg-white p-4">
      <UserCard user={product.producer} />
      <hr className="my-2 text-light-gray" />
      <span className="grid grid-cols-3">
        <Entry
          title="Precio total"
          value={formatMoney(product.unitPrice * product.amount)}
        />
        <Entry title="Cantidad" value={`${product.amount} ${product.unit}`} />
        <Button className="-ml-3 text-center font-semibold">COMPRAR</Button>
      </span>
    </FixedDrawer>
  );
};

const Entry = ({ title, value }: { title: string; value: string }) => (
  <span className="flex flex-col items-start">
    <p className="text-xl text-black">{title}</p>
    <p className="text-2xl font-semibold text-black">{value}</p>
  </span>
);
