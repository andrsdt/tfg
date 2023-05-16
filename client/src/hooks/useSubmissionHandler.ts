import { useEffect, useState } from 'react';

export const useSubmissionHandler = (
  submitFn: (...args: any[]) => Promise<any>,
  { onSuccess }: { onSuccess?: (...args: any[]) => void } = {}
) => {
  const [response, setResponse] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);

  const handleSubmit = async (...args: any[]) => {
    setIsSubmitting(true);
    try {
      const res = await submitFn(...args);
      setIsSuccessful(true);
      setResponse(res);
    } catch (error) {
      setIsSubmitting(false);
      throw error;
    }
  };

  useEffect(() => {
    if (isSuccessful && onSuccess) {
      onSuccess?.();
    }
  }, [isSuccessful, onSuccess, response]);

  return [handleSubmit, isSubmitting, isSuccessful, response] as const;
};
