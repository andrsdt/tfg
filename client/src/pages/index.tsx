import { NotificationsButton } from '@/components/Elements';
import { LayoutWithNavbar } from '@/components/Layouts';
import { ProductCard } from '@/features/products/components/Card/Card';
import { ProductHorizontalCarousel } from '@/features/products/components/Carousel';
import { ProductSearchBar } from '@/features/products/components/Search/SearchBar';
import { product } from '@/features/products/mock/data';
import { useAuth } from '@/hooks/useAuth';
import { uuid } from '@/utils/uuid';

const Home = () => {
  useAuth({ middleware: ['auth'] });
  const products = [...Array(20)].map(() => product);

  return (
    <LayoutWithNavbar className="p-6">
      <span className="flex items-center justify-between space-x-4">
        <ProductSearchBar />
        <NotificationsButton />
      </span>
      <h2 className="mb-1 mt-3 text-2xl font-bold tracking-tight text-black">
        Últimas novedades
      </h2>
      <ProductHorizontalCarousel products={products} />
      <h2 className="mb-1 mt-3 text-2xl font-bold tracking-tight text-black">
        Cerca de tí
      </h2>
      <div className="grid grid-cols-2 gap-x-3 gap-y-5">
        {products.map((product) => (
          <ProductCard key={uuid()} product={product} />
        ))}
      </div>
    </LayoutWithNavbar>
  );
};

export default Home;
