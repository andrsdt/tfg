import { Pill } from '@/components/Elements';
import { ALLERGENS } from '@/features/listings/types/allergens';
import { capitalize } from '@/utils/formatters';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import router from 'next/router';
import { FilterPill } from '../FilterPill';

export const AllergensFilter = () => {
  return (
    <FilterPill
      name="allergens"
      queries={['allergens']}
      Drawer={<AllergensDrawer />}
    />
  );
};

const AllergensDrawer = () => {
  const selectedAllergens =
    useSearchParams()
      .get('allergens')
      ?.split(',')
      ?.filter((e) => e !== '') || [];

  const toggleAllergen = (allergen: string) => {
    // If the allergen was selected, remove it from the list. After that,
    // push the new query to the URL without reloading the page (shallow)
    const updatedAllergens = selectedAllergens.includes(allergen)
      ? selectedAllergens.filter((a) => a !== allergen).join(',') // if removing an existing one
      : [...selectedAllergens, allergen].join(','); // if adding a new one

    router.push(
      {
        query: {
          ...router.query,
          allergens: updatedAllergens,
        },
      },
      undefined,
      {
        shallow: true,
      }
    );
  };

  return (
    <div className="text-start">
      <h1 className="text-3xl font-bold tracking-tight">Alérgenos</h1>
      <p className="mb-8 text-xl font-light text-gray">
        Que quieras excluír de los resultados
      </p>
      <span className="flex flex-wrap">
        {Object.values(ALLERGENS).map((allergen) => (
          <Pill
            key={allergen.name}
            isSelected={selectedAllergens.includes(allergen.name)}
            onClick={() => toggleAllergen(allergen.name)}
            className="mb-2.5 mr-2.5 flex h-min items-center rounded-full pr-3 text-lg"
          >
            <Image
              src={allergen.icon as any}
              alt="Ilustración del alérgeno"
              width={35}
              // TODO: add p-1 below once the images are fixed (perfect circles)
              className="m-0.5 mr-1.5 aspect-square rounded-full border-2 border-white bg-white object-cover"
            />
            {capitalize(allergen.translation)}
          </Pill>
        ))}
      </span>
    </div>
  );
};
