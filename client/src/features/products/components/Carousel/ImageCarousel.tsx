import useEmblaCarousel, { EmblaOptionsType } from 'embla-carousel-react';
import * as React from 'react';
import styles from './ImageCarousel.module.css';
import clsx from 'clsx';

type ProductPicturesCarouselProps = {
  slides: string[];
  options?: EmblaOptionsType;
  className?: string;
};

export const ImageCarousel: React.FC<ProductPicturesCarouselProps> = ({
  slides,
  className = '',
}: ProductPicturesCarouselProps) => {
  const [emblaRef] = useEmblaCarousel();

  return (
    <div className={clsx(className, styles.embla)}>
      <div className={styles.embla__viewport} ref={emblaRef}>
        <div className={styles.embla__container}>
          {slides.map((image, currentIndex) => (
            <div className={styles.embla__slide} key={image}>
              <img
                className={styles.embla__slide__img}
                src={image}
                alt="Your alt text"
              />

              <div className="flex -translate-y-8 justify-center space-x-2">
                {slides.map((_, index) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <DotIndicator key={index} selected={index === currentIndex} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const DotIndicator = ({ selected }: { selected: boolean }) => (
  <div
    className={clsx(
      'h-4 w-4 rounded-full',
      selected ? ' bg-white' : 'scale-50 bg-light-gray'
    )}
  />
);
