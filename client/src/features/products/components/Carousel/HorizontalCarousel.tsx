import useEmblaCarousel, { EmblaOptionsType } from 'embla-carousel-react';
import { ProductCard } from '../Card/Card';
import { product } from '../../mock/data';
import styles from './HorizontalCarousel.module.css';
import clsx from 'clsx';
import { uuid } from '@/utils/uuid';

type ProductHorizontalCarouselProps = {
  products: (typeof product)[];
};

export const ProductHorizontalCarousel = ({
  products,
}: ProductHorizontalCarouselProps) => {
  const options: EmblaOptionsType = {
    dragFree: true,
    containScroll: 'trimSnaps',
  };
  const [emblaRef] = useEmblaCarousel(options);

  return (
    <div className={clsx(styles.embla, '-mx-6')}>
      <div className={clsx(styles.embla__viewport, 'px-6')} ref={emblaRef}>
        <div className={clsx(styles.embla__container, 'space-x-3')}>
          {products.map((product) => (
            <div className={styles.embla__slide} key={uuid()}>
              <ProductCard product={product} mini />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
