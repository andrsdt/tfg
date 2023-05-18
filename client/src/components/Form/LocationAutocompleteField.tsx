import { formatCoordinatesAsWKT } from '@/utils/formatters';
import clsx from 'clsx';
import React, { useState } from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import { FieldWrapperPassThroughProps } from './FieldWrapper';

type LocationAutocompleteFieldProps = FieldWrapperPassThroughProps & {
  onChange: (value: string) => void;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  className?: string;
};

export const LocationAutocompleteField = ({
  onChange,
  inputProps,
  className,
}: LocationAutocompleteFieldProps) => {
  const [address, setAddress] = useState('');

  const handleSelect = async (selectedAddress) => {
    try {
      const results = await geocodeByAddress(selectedAddress);
      const latLng = await getLatLng(results[0]);
      onChange(formatCoordinatesAsWKT(latLng)); // update the coords in the form
      setAddress(selectedAddress); // update the input field
    } catch (error) {
      onChange('');
    }
  };

  return (
    <PlacesAutocomplete
      value={address}
      onChange={setAddress}
      onSelect={handleSelect}
      debounce={500}
      highlightFirstSuggestion
      // https://developers.google.com/maps/documentation/javascript/reference/places-widget#PlaceAutocompleteElementOptions-Properties
      searchOptions={{
        componentRestrictions: {
          country: 'ES',
        },
        requestedLanguage: 'es',
        requestedRegion: 'es',
      }}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div className={clsx('relative', className)}>
          <input
            {...getInputProps({
              placeholder: 'Selecciona tu ubicación...',
              ...inputProps,
            })}
          />
          <div className="absolute top-12 z-10 rounded-3xl bg-white">
            {loading && <div>Loading...</div>}
            {suggestions.map((suggestion) => (
              <div
                key={suggestion.id}
                {...getSuggestionItemProps(suggestion)}
                className={clsx(
                  'cursor-pointer p-2 text-sm hover:bg-light-gray',
                  suggestion.active ? 'bg-light-gray' : 'bg-white'
                )}
              >
                <span>{suggestion.description}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </PlacesAutocomplete>
  );
};
