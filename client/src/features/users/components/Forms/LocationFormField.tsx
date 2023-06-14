import { LocationAutocompleteField } from '@/components/Form/LocationAutocompleteField';
import { WithUnitField } from '@/components/Form/WithUnitField';
import Map from '@/components/Map/Map';
import { formatWKTAsCoordinates } from '@/utils/formatters';
import { MapPinIcon } from '@heroicons/react/24/solid';
import { Control, Controller, UseFormWatch } from 'react-hook-form';
import { UpdateProfileValues } from '../../api/update';

type LocationFormFieldProps = {
  control: Control<UpdateProfileValues, any>;
  watch: UseFormWatch<UpdateProfileValues>;
};

export const LocationFormField = ({
  control,
  watch,
}: LocationFormFieldProps) => {
  return (
    <>
      <WithUnitField className="h-14" unit={<MapPinIcon className="w-6" />}>
        <Controller
          control={control}
          name="location"
          render={({ field: { onChange } }) => (
            <LocationAutocompleteField
              className="px-2 text-xl outline-none"
              inputProps={{
                className: 'text-xl outline-none',
              }}
              onChange={onChange}
            />
          )}
        />
      </WithUnitField>
      <Map
        center={formatWKTAsCoordinates(watch('location'))}
        className="my-2 h-48 w-full rounded-full"
      />
    </>
  );
};
