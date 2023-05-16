import { Button, Separator } from '@/components/Elements';
import {
  ConditionalInputField,
  Form,
  InputField,
  TextAreaField,
} from '@/components/Form';
import {
  ChoiceButton,
  ChoiceButtonsField,
} from '@/components/Form/ChoiceButtonsField';
import { WithUnitField } from '@/components/Form/WithUnitField';
import { formatWordBreaks } from '@/utils/WordBreaks';
import CurrencyInput from 'react-currency-input-field';
import { FieldError } from 'react-hook-form';
import { CreateListingDTO } from '../../api/create';
import { UpdateListingDTO } from '../../api/update';
import { createSchema } from '../../schemas/create';
import { Unit } from '../../types/units';
import { MutableAllergensList } from '../Lists';
import { MutableFeaturesList } from '../Lists/MutableFeaturesList';
import { ImageCarouselInput } from './ImageCarouselInput';

export type ListingDTO = CreateListingDTO | UpdateListingDTO;

type ListingFormProps = {
  onSubmit?: <T>(params: any, data: T) => void;
  isSubmitting?: boolean;
  isEdit?: boolean;
  defaults?: ListingDTO;
};

export const ListingForm = ({
  onSubmit,
  isSubmitting,
  isEdit = false,
  defaults,
}: ListingFormProps) => {
  const submitMessage = isEdit ? 'ACTUALIZAR' : 'PUBLICAR';

  return (
    <Form<ListingDTO, typeof createSchema>
      className="h-full"
      onSubmit={onSubmit}
      schema={createSchema}
      defaults={defaults}
    >
      {({ register, formState, watch, setValue }) => {
        const hasChosenListingUnit = !!watch('unit'); // kg or unit
        const hasEnteredQuantity = !!watch('available_quantity');
        const hasEnteredPricePerUnit = !!watch('price_per_unit');
        return (
          <div className="flex h-full flex-col justify-between">
            <div className="flex flex-col space-y-2">
              <ImageCarouselInput
                watch={watch}
                setValue={setValue}
                error={formState.errors['images'] as FieldError}
              />
              <InputField
                className="pt-6"
                label="Título"
                inputProps={{
                  placeholder: '¿Qué estás vendiendo?',
                }}
                error={formState.errors['title']}
                registration={register('title')}
              />
              <MutableAllergensList watch={watch} setValue={setValue} />
              <TextAreaField
                inputProps={{
                  placeholder: 'Introduce una descripción',
                }}
                registration={register('description')}
                error={formState.errors['description']}
              />
              <Separator className="mb-0 mt-0" />
              <MutableFeaturesList watch={watch} setValue={setValue} />
              <Separator className="mb-0 mt-0" />
              <ConditionalInputField title="Vendo mi producto...">
                <ChoiceButtonsField error={formState.errors['unit']}>
                  <ChoiceButton
                    value={'UNIT' as Unit}
                    label={formatWordBreaks('Por unidad\n(caja, pieza...)')}
                    registration={register('unit')}
                  />
                  <ChoiceButton
                    value={'KG' as Unit}
                    label={formatWordBreaks('A granel\n(kg)')}
                    registration={register('unit')}
                  />
                </ChoiceButtonsField>
              </ConditionalInputField>
              <ConditionalInputField
                title="Pongo en venta..."
                showIf={hasChosenListingUnit}
              >
                <WithUnitField
                  unit={watch('unit') === 'UNIT' ? 'uds' : 'kg'}
                  className="w-min"
                  error={formState.errors['available_quantity']}
                >
                  <input
                    type="number"
                    min={1}
                    step={1}
                    className="w-24 text-center outline-none"
                    {...register('available_quantity', { valueAsNumber: true })}
                  />
                </WithUnitField>
              </ConditionalInputField>
              <ConditionalInputField
                title={`El precio por ${
                  watch('unit') === 'KG' ? 'kg' : 'unidad'
                } es de...`}
                showIf={hasChosenListingUnit && hasEnteredQuantity}
              >
                <WithUnitField
                  unit="€"
                  className={'w-min'}
                  error={formState.errors['price_per_unit']}
                >
                  <CurrencyInput
                    className="w-24 text-center outline-none"
                    {...register('price_per_unit', { valueAsNumber: true })}
                  />
                </WithUnitField>
              </ConditionalInputField>
              <ConditionalInputField
                title="Cada unidad pesa... (opcional)"
                showIf={watch('unit') === 'UNIT' && hasEnteredPricePerUnit}
              >
                <WithUnitField
                  unit="g"
                  className="w-min"
                  error={formState.errors['g_per_unit']}
                >
                  <input
                    type="number"
                    min={0}
                    max={100000}
                    className="w-24 text-center outline-none"
                    {...register('g_per_unit', { valueAsNumber: true })}
                  />
                </WithUnitField>
              </ConditionalInputField>
            </div>
            <Button disabled={isSubmitting} type="submit" className="w-full">
              {submitMessage}
            </Button>
          </div>
        );
      }}
    </Form>
  );
};
