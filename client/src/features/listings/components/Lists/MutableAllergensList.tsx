import { useToggle } from '@/hooks/useToggle';
import { Dialog } from '@/components/Dialog';
import clsx from 'clsx';
import { ALLERGENS, Allergen } from '../../types/allergens';
import Image from 'next/image';
import { AllergenList } from '.';
import { UseFormWatch, UseFormSetValue } from 'react-hook-form';
import { ListingDTO } from '../Form/ListingForm';

const toggleAllergen = (
  allergen: string,
  selectedAllergens: string[],
  setValue
) => {
  if (selectedAllergens.includes(allergen)) {
    setValue(
      'allergens',
      selectedAllergens.filter((a) => a !== allergen)
    );
  } else {
    setValue('allergens', [...selectedAllergens, allergen]);
  }
};

type MutableAllergensListProps = {
  watch: UseFormWatch<ListingDTO>;
  setValue: UseFormSetValue<ListingDTO>;
};

export const MutableAllergensList = ({
  watch,
  setValue,
}: MutableAllergensListProps) => {
  const [isOpenModal, toggleModal] = useToggle(false);
  const selectedAllergens = watch('allergens', []);
  const hasSelectedAllergens = selectedAllergens.length > 0;

  return (
    <>
      {hasSelectedAllergens ? (
        <AllergenList
          props={{
            onClick: toggleModal,
          }}
          allergens={selectedAllergens}
          className="mb-4 cursor-pointer rounded-md outline outline-1 outline-light-gray"
        />
      ) : (
        <button
          type="button"
          className="mb-2 text-start font-semibold text-green underline"
          onClick={toggleModal}
        >
          Añadir alérgenos...
        </button>
      )}
      {/* TODO: turn into functional component */}
      {ChooseAllergensDialog(
        isOpenModal,
        toggleModal,
        selectedAllergens,
        setValue
      )}
    </>
  );
};
const ChooseAllergensDialog = (
  isOpenModal: boolean,
  toggleModal: () => void,
  selectedAllergens: Allergen[],
  setValue: UseFormSetValue<ListingDTO>
) => (
  <Dialog isOpen={isOpenModal} onClose={toggleModal}>
    <div className="z-50 grid w-full grid-cols-3 gap-4 rounded-t-3xl bg-white p-4">
      {Object.values(ALLERGENS).map((allergen) => (
        <button
          className={clsx(
            'flex flex-col items-center p-2',
            selectedAllergens.includes(allergen.name)
              ? 'rounded-md outline outline-2 outline-light-gray'
              : 'grayscale'
          )}
          key={allergen.name}
          onClick={() =>
            toggleAllergen(allergen.name, selectedAllergens, setValue)
          }
        >
          <Image
            className="w-2/3 pb-2"
            src={allergen.icon as any}
            alt={allergen.translation}
          />
          <p className="text-center text-sm font-bold uppercase">
            {allergen.translation}
          </p>
        </button>
      ))}
    </div>
  </Dialog>
);
