import { Error } from '@/components/Form';
import clsx from 'clsx';
import { useCallback } from 'react';
import { FieldError, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { MutableCarousel } from '../Carousel';
import { ListingDTO } from './ListingForm';

type ImageCarouselInputProps = {
  watch: UseFormWatch<ListingDTO>;
  setValue: UseFormSetValue<ListingDTO>;
  error?: FieldError;
};

export const ImageCarouselInput = ({
  watch,
  setValue,
  error,
}: ImageCarouselInputProps) => {
  const images = watch('images', []);
  const hasImages = images.length > 0;

  const transform = useCallback(
    (slide: File) => URL.createObjectURL(slide),
    []
  );

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newImages = Array.from(e.target.files);
    const oldImagesWithoutDuplicates = images.filter(
      (e: File) =>
        !newImages.some((f) => f.name === e.name && f.size === e.size)
    );
    const allImages = [...oldImagesWithoutDuplicates, ...newImages];
    e.target.value = ''; // Reset the input value to allow uploading the same again
    setValue('images', allImages);
  };

  return (
    <>
      <label htmlFor="images">
        <div className={clsx('relative -mx-4', !hasImages && 'cursor-pointer')}>
          <MutableCarousel
            className={clsx(error && 'border-1 border border-light-red')}
            slides={images}
            transform={transform}
            handleDelete={(target: File) => {
              setValue(
                'images',
                images.filter(
                  (f: File) => f.name !== target.name && f.size !== target.size
                )
              );
            }}
          />
          {error && <Error error={error} />}
        </div>
      </label>
      <input
        id="images"
        type="file"
        accept="image/*"
        multiple
        hidden
        onChange={handleImageUpload}
      />
    </>
  );
};
