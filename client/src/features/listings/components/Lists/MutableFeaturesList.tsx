import { Dialog } from '@/components/Dialog';
import { useToggle } from '@/hooks/useToggle';
import { PlusIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import Image from 'next/image';
import { FeatureList } from '.';
import { FEATURES } from '../../types/features';
import { UseFormWatch, UseFormSetValue } from 'react-hook-form';
import { ListingDTO } from '../Form/ListingForm';

const toggleFeature = (
  feature: string,
  selectedFeatures: string[],
  setValue
) => {
  if (selectedFeatures.includes(feature)) {
    setValue(
      'features',
      selectedFeatures.filter((a) => a !== feature)
    );
  } else {
    setValue('features', [...selectedFeatures, feature]);
  }
};

type MutableFeaturesListProps = {
  watch: UseFormWatch<ListingDTO>;
  setValue: UseFormSetValue<ListingDTO>;
};

export const MutableFeaturesList = ({
  watch,
  setValue,
}: MutableFeaturesListProps) => {
  const [isOpenModal, toggleModal] = useToggle(false);
  const selectedFeatures = watch('features', []);

  return (
    <div className="-mx-4 flex space-x-3 overflow-x-scroll py-1">
      <div className="w-4 bg-transparent" />
      <div
        className="grid cursor-pointer grid-rows-2 place-items-center rounded-md px-3 outline outline-1 outline-light-gray"
        onClick={toggleModal}
      >
        <PlusIcon className="w-12" />
        <h3 className="text-black">Añadir...</h3>
      </div>
      <FeatureList
        features={selectedFeatures}
        className="space-x-3"
        itemClassName="rounded-md p-0.5 outline outline-1 outline-light-gray"
        handleDelete={(feature) => {
          setValue(
            'features',
            selectedFeatures.filter((f) => f !== feature)
          );
        }}
      />
      {ChooseFeaturesDialog(
        isOpenModal,
        toggleModal,
        selectedFeatures,
        setValue
      )}
    </div>
  );
};

const ChooseFeaturesDialog = (
  isOpenModal: boolean,
  toggleModal: () => void,
  selectedFeatures: any,
  setValue: any
) => (
  <Dialog isOpen={isOpenModal} onClose={toggleModal}>
    <div className="z-50 grid w-full grid-cols-3 gap-3 rounded-t-3xl bg-white p-4">
      {Object.values(FEATURES).map((feature) => (
        <button
          className={clsx(
            'grid grid-rows-2 place-items-center',
            selectedFeatures.includes(feature.name)
              ? 'rounded-md outline outline-2 outline-light-gray'
              : 'opacity-50'
          )}
          key={feature.name}
          onClick={() =>
            toggleFeature(feature.name, selectedFeatures, setValue)
          }
        >
          <Image
            src={feature.icon as any}
            alt={feature.translation}
            className="w-12"
          />
          <p className="text-center text-sm font-bold uppercase">
            {feature.translation}
          </p>
        </button>
      ))}
    </div>
  </Dialog>
);
