import { Button } from '@/components/Elements';
import { Form, TextAreaField } from '@/components/Form';
import { SubmitHandler } from 'react-hook-form';
import { ZodObject } from 'zod';
import { SendReportValues } from '../api/create';

type ReportFormProps = {
  onSubmit: SubmitHandler<SendReportValues>;
  defaults?: SendReportValues;
  schema: ZodObject<any>;
  isSubmitting: boolean;
};

export const ReportForm = ({
  onSubmit,
  defaults,
  schema,
  isSubmitting,
}: ReportFormProps) => {
  return (
    <Form<SendReportValues, typeof schema>
      onSubmit={onSubmit}
      schema={schema}
      defaults={defaults}
    >
      {({ register, formState }) => {
        return (
          <>
            <TextAreaField
              registration={register('description')}
              error={formState.errors['description']}
              inputClassName="mt-2 min-h-[20rem]"
              inputProps={{
                placeholder:
                  'Resume brevemente el problema que has tenido con este productor...',
              }}
            />
            <Button className="w-full" type="submit" disabled={isSubmitting}>
              ENVIAR
            </Button>
          </>
        );
      }}
    </Form>
  );
};
