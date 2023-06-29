import { useState } from 'react';

export const useSubmissionHandler = (
  submitFn: (...args: any[]) => Promise<any>,
  { onSuccess }: { onSuccess?: (...args: any[]) => any } = {}
) => {
  const [response, setResponse] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);

  const handleSubmit = async (...args: any[]) => {
    setIsSubmitting(true);
    try {
      const response = await submitFn(...args);

      const sanitizedResponse = response?.data ?? response;

      setIsSuccessful(true);
      setIsSubmitting(false);
      setResponse(sanitizedResponse);
      await onSuccess?.(sanitizedResponse);
    } catch (error) {
      setIsSubmitting(false);
      throw error;
    }
  };

  return [handleSubmit, isSubmitting, isSuccessful, response] as const;
};
