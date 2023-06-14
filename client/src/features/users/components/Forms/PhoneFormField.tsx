import { WithUnitField } from '@/components/Form/WithUnitField';
import { PhoneIcon } from '@heroicons/react/24/solid';
import { Control, Controller } from 'react-hook-form';
import PhoneInput from 'react-phone-input-2';
import { UpdateProfileValues } from '../../api/update';
import 'react-phone-input-2/lib/bootstrap.css';

type PhoneFormFieldProps = {
  control: Control<UpdateProfileValues, any>;
  defaultValue?: string;
};

export const PhoneFormField = ({
  control,
  defaultValue,
}: PhoneFormFieldProps) => {
  return (
    <WithUnitField className="h-14" unit={<PhoneIcon className="w-6" />}>
      <Controller
        name="phone"
        control={control}
        defaultValue={defaultValue}
        render={({ field: { onChange, value } }) => (
          <PhoneInput
            inputClass="h-full w-full text-2xl"
            placeholder="666 123 456"
            country="es"
            countryCodeEditable={false}
            disableDropdown={true}
            value={value}
            onChange={onChange}
          />
        )}
      />
    </WithUnitField>
  );
};
