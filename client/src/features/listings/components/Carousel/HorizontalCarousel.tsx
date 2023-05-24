import { uuid } from '@/utils/uuid';
import clsx from 'clsx';
import useEmblaCarousel, { EmblaOptionsType } from 'embla-carousel-react';
import { Listing } from '../../types/listings';
import { ListingCard } from '../Card/Card';
import styles from './HorizontalCarousel.module.css';

type ListingHorizontalCarouselProps = {
  listings: Listing[];
};

export const ListingHorizontalCarousel = ({
  listings,
}: ListingHorizontalCarouselProps) => {
  const options: EmblaOptionsType = {
    dragFree: true,
    containScroll: 'trimSnaps',
  };
  const [emblaRef] = useEmblaCarousel(options);

  if (!listings) return <>Loading...</>;

  return (
    <div className={clsx(styles.embla, '-mx-6')}>
      <div className={clsx(styles.embla__viewport, 'px-6')} ref={emblaRef}>
        <div className={clsx(styles.embla__container, 'space-x-3')}>
          {listings?.map((listing) => (
            <div className={styles.embla__slide} key={uuid()}>
              <ListingCard listing={listing} mini />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
