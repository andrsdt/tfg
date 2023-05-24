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

const DISTANCE_OPTIONS = {
  1000: '<1 km',
  5000: '<5 km',
  10000: '<10 km',
  50000: '<50 km',
  100000: '<100 km',
};

export const DistanceFilter = () => {
  const { user } = useAuth();
  const selectedDistance = useSearchParams().get('distance') || '';
  const defaultText = 'Distancia';

  return (
    <FilterPill
      text={
        selectedDistance.length
          ? DISTANCE_OPTIONS[selectedDistance]
          : defaultText
      }
      drawerName="distance"
      queries={['distance']}
      Drawer={<DistanceDrawer />}
      show={!!user?.location}
    />
  );
};

const DistanceDrawer = () => {
  const selectedDistance = useSearchParams().get('distance') || '';
  const selectedLocation = useSearchParams().get('location') || ''; // -36.606,-72.103
  const { user } = useAuth();

  return (
    <div className="text-start">
      <h1 className="text-3xl font-bold tracking-tight">Distancia</h1>
      <p className="mb-8 text-xl font-light text-gray">
        A la que quieras limitar los resultados
      </p>
      <span className="flex flex-wrap">
        {Object.entries(DISTANCE_OPTIONS).map(([value, label]) => (
          <Pill
            key={value}
            isSelected={selectedDistance === value}
            onClick={() => {
              // If the filter is already selected, remove it on click
              const shouldRemoveFilters = selectedDistance === value;
              router.push(
                {
                  query: {
                    ...router.query,
                    distance: shouldRemoveFilters ? undefined : value,
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
