import { Pill } from '@/components/Elements';
import Map from '@/components/Map/Map';
import { useAuth } from '@/hooks/useAuth';
import { useSearchParams } from 'next/navigation';
import router from 'next/router';
import { FilterPill } from '../FilterPill';
import { Point } from 'geojson';
import {
  transformCoordsPairToCoordinates,
  transformLocationToCoordinates,
} from '@/utils/formatters';

export const DistanceFilter = () => {
  return (
    <FilterPill
      name="distance"
      queries={['distance']}
      Drawer={<DistanceDrawer />}
    />
  );
};

const DistanceDrawer = () => {
  const selectedDistance = useSearchParams().get('distance') || '';
  const selectedLocation = useSearchParams().get('location') || ''; // -36.606,-72.103
  const { user } = useAuth();

  const options = {
    1000: '<1 km',
    10000: '<10 km',
    50000: '<50 km',
    100000: '<100 km',
  };

  return (
    <div className="text-start">
      <h1 className="text-3xl font-bold tracking-tight">Distancia</h1>
      <p className="mb-8 text-xl font-light text-gray">
        A la que quieras limitar los resultados
      </p>
      <span className="flex flex-wrap">
        {Object.entries(options).map(([value, label]) => (
          <Pill
            key={value}
            isSelected={selectedDistance === value}
            onClick={() => {
              router.push(
                {
                  query: {
                    ...router.query,
                    distance: value,
                  },
                },
                undefined,
                {
                  shallow: true,
                }
              );
            }}
            className="mb-2.5 mr-2.5 flex h-min items-center rounded-full px-3 py-1.5 text-lg"
          >
            {label}
          </Pill>
        ))}
      </span>
      <Map
        center={
          transformCoordsPairToCoordinates(selectedLocation) ??
          transformLocationToCoordinates(user?.location as Point)
        }
        radiusInMeters={Number.parseInt(selectedDistance)}
      />
    </div>
  );
};
