import { AllergensList } from '@/components/Elements';
import { BackButton } from '@/components/Elements/Button';
import { BaseLayout } from '@/components/Layouts';
import { ImageCarousel } from '@/features/products/components/Carousel';
import { ProductDetailsDrawer } from '@/features/products/components/Drawer';
import { ProductOptionsDropdown } from '@/features/products/components/Dropdown/OptionsDropdown';
import { ProductFeatures } from '@/features/products/components/Features';
import { product } from '@/features/products/mock/data';
import { Allergen } from '@/features/products/types/allergens';
import { Feature } from '@/features/products/types/features';
import dayjs from '@/lib/dayjs';
import { HeartIcon } from '@heroicons/react/24/outline';
import { EyeIcon } from '@heroicons/react/24/solid';

const Product = () => {
  // const {
  //   query: { id },
  // } = useRouter();

  return (
    <BaseLayout className="flex flex-col justify-between">
      <BackButton />
      <div>
        <div className="relative">
          <ProductOptionsDropdown product={product} />
          <ImageCarousel slides={product.images} />
        </div>
        <div className="mx-4">
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <AllergensList allergens={product.allergens as Allergen[]} />
          <p>{product.description}</p>
          <span className="mt-5 flex w-full justify-between text-lg">
            <p>{dayjs(product.updated_at).format('DD/MM/YYYY')}</p>
            <span className="flex space-x-4">
              <p className="flex items-center">
                <EyeIcon className="mr-1 h-5 w-5" /> {product.views}
              </p>
              <p className="flex items-center">
                <HeartIcon className="mr-1 h-5 w-5" />
                {product.favorites}
              </p>
            </span>
          </span>
          <hr className="my-2 text-light-gray" />
          <ProductFeatures
            className="my-2"
            features={product.features as Feature[]}
          />
          <hr className="my-2 text-light-gray" />
        </div>
        {/* <ProductLocation location={data.location} /> */}
      </div>
      <ProductDetailsDrawer product={product} />
    </BaseLayout>
  );
};

export default Product;
