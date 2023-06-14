import { useCarouselHelpers } from '@/hooks/useCarouselHelpers';
import { MinusCircleIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import useEmblaCarousel from 'embla-carousel-react';
import { nanoid } from 'nanoid';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import styles from './MutableCarousel.module.css';

type MutableCarouselProps = {
  slides: any[];
  transform?: (slide: any) => string;
  handleDelete?: (element: any) => void;
  className?: string;
};

// A carousel that offers the ability to add and remove items from it
export const MutableCarousel = ({
  slides = [],
  // Function that transforms, if needed, each
  // slide to a valid src attribute for the <img>
  transform = (s) => s,
  handleDelete,
  className,
}: MutableCarouselProps) => {
  const carousel = useEmblaCarousel();
  const [emblaRef] = carousel;

  // useMemo for performance in transform function
  const transformedSlides = useMemo(
    () => slides?.map((s) => transform(s)),
    [slides, transform]
  );

  if (!slides.length)
    return <CarouselWaitingForUpload className={clsx(className)} />;

  return (
    <div className={styles['embla']}>
      <div className={styles['embla__viewport']} ref={emblaRef}>
        <div className={styles['embla__container']}>
          {slides.map((slide, idx) => (
            <div
              className={clsx('relative', styles['embla__slide'])}
              key={transformedSlides[idx]}
            >
              {handleDelete && (
                <DeleteButton element={slide} handleDelete={handleDelete} />
              )}
              <Image
                className={styles['embla__slide__img']}
                src={transformedSlides[idx]}
                alt="Imagen del producto"
                width={150}
                height={100}
              />
            </div>
          ))}
        </div>
        <div className="flex w-full -translate-y-8 justify-center space-x-2">
          <DotNavigator carousel={carousel} slides={slides} />
        </div>
      </div>
    </div>
  );
};

type DotNavigatorProps = {
  carousel: ReturnType<typeof useEmblaCarousel>;
  slides: string[];
};

const DotNavigator = ({ carousel, slides }: DotNavigatorProps) => {
  const [slidesState, setSlidesState] = useState(slides);
  useEffect(() => {
    setSlidesState(slides);
  }, [slides]);

  const { scrollSnaps, selectedIndex, scrollTo } = useCarouselHelpers(
    carousel,
    slidesState
  );

  return (
    <>
      {scrollSnaps.map((_, index) => (
        <Dot
          key={nanoid()}
          selected={index === selectedIndex}
          onClick={(e) => {
            e.preventDefault();
            scrollTo(index);
          }}
        />
      ))}
    </>
  );
};

type DotProps = {
  selected: boolean;
  onClick?: (e) => void;
};

const Dot = ({ selected, onClick }: DotProps) => (
  <div
    className={clsx(
      'h-4 w-4 cursor-pointer rounded-full',
      selected ? ' bg-white' : 'scale-50 bg-light-gray'
    )}
    onClick={onClick}
  />
);

const PLACEHOLDER_IMAGE = '/placeholders/image.jpg';

type CarouselWaitingForUploadProps = {
  className?: string;
};

const CarouselWaitingForUpload = ({
  className,
}: CarouselWaitingForUploadProps) => (
  <Image
    src={PLACEHOLDER_IMAGE}
    alt=""
    width={500}
    height={320}
    className={clsx('w-full', className)}
  />
);

type DeleteButtonProps = {
  element: any;
  handleDelete: (element: any) => void;
};

const DeleteButton = ({ element, handleDelete }: DeleteButtonProps) => (
  <MinusCircleIcon
    className="absolute right-2 top-2 z-10 w-14 cursor-pointer fill-light-red stroke-white"
    onClick={(e) => {
      e.preventDefault();
      handleDelete(element);
    }}
  />
);
