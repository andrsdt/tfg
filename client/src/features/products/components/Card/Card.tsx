import NEXT_ROUTES from '@/constants/routes';
import { formatMoney } from '@/utils/formatters';
import { TruckIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import Link from 'next/link';
import { LikeButton } from '../Buttons/LikeButton';
import clsx from 'clsx';
import { uuid } from '@/utils/uuid';

type ProductCardProps = {
  // TODO: Add product type when it's defined
  product: any;
  mini?: boolean;
  className?: string;
};

export const ProductCard = ({
  product,
  mini = false,
  className = '',
}: ProductCardProps) => {
  return (
    <div className={clsx('flex flex-col justify-between', className)}>
      <Link key={uuid()} href={NEXT_ROUTES.PRODUCT_DETAILS(product.id)}>
        <div className="relative">
          {product?.features.includes('allows_delivery') && (
            <TruckIcon className="absolute right-2 top-2 h-8 w-8 rounded-full bg-white p-2 text-black" />
          )}
          <Image
            className="aspect-[5/4] rounded-lg object-cover"
            src={product?.images[1]}
            alt={product?.name}
            width={250}
            height={300}
          />
        </div>
        <h3 className={clsx('truncate text-lg font-semibold', !mini && 'mt-1')}>
          {product.name}
        </h3>
        {!mini && <p className="mb-1 line-clamp-3">{product.description}</p>}
      </Link>
      <span className="flex w-full justify-between">
        <span className="text-xl font-semibold">
          {formatMoney(product.unitPrice)}/{product.unit}
        </span>
        <LikeButton product={product} />
      </span>
    </div>
  );
};
