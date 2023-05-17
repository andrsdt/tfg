import { Pill } from '@/components/Elements';
import { FEATURES } from '@/features/listings/types/features';
import { capitalize } from '@/utils/formatters';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import router from 'next/router';
import { FilterPill } from '../FilterPill';

export const FeaturesFilter = () => {
  return (
    <FilterPill
      name="features"
      queries={['features']}
      Drawer={<FeaturesDrawer />}
    />
  );
};

const FeaturesDrawer = () => {
  const selectedFeatures =
    useSearchParams()
      .get('features')
      ?.split(',')
      ?.filter((e) => e !== '') || [];
  const toggleFeature = (feature: string) => {
    // If the feature was selected, remove it from the list. After that,
    // push the new query to the URL without reloading the page (shallow)
    router.push(
      {
        query: {
          ...router.query,
          features: selectedFeatures.includes(feature)
            ? selectedFeatures.filter((f) => f !== feature).join(',')
            : [...selectedFeatures, feature].join(','),
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
      <h1 className="text-3xl font-bold tracking-tight">Características</h1>
      <p className="mb-8 text-xl font-light text-gray">
        Del producto que buscas
      </p>
      <span className="flex flex-wrap">
        {Object.values(FEATURES).map((feature) => (
          <Pill
            key={feature.name}
            isSelected={selectedFeatures.includes(feature.name)}
            onClick={() => toggleFeature(feature.name)}
            className="mb-2.5 mr-2.5 flex h-min items-center rounded-full pr-3 text-lg"
          >
            <Image
              src={feature.icon as any}
              alt="Ilustración de la característica"
              width={35}
              className="m-0.5 mr-1 rounded-full border-2 border-white bg-white p-1"
            />
            {capitalize(feature.translation)}
          </Pill>
        ))}
      </span>
    </div>
  );
};
