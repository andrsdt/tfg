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
      const response = await submitFn(...args);

      // TODO: sometimes response is an <OperationResponse<O>>
      // but some other it's already <O>, thus the workaround. I have
      // to look into this, it could be a bug in openapi-client-axios.
      const sanitizedResponse = response?.data ?? response;

      setIsSuccessful(true);
      setIsSubmitting(false);
      setResponse(sanitizedResponse);
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
