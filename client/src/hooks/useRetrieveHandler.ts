import { OperationResponse } from 'openapi-client-axios';
import { useCallback, useEffect, useState } from 'react';

// O = Original type (e.g., a listing object)
// T = Transformed type (e.g., a ListingDTO object)
const noopTransform = async (data) => await data;

const noopCallback = () => {
  return;
};

type useRetrieveHandlerProps<O, T> = {
  transform?: (data: O) => Promise<T>;
  onSuccess?: (data: T) => void;
  onError?: (error: any) => void;
  fetchOnChange?: any[];
};

export const useRetrieveHandler = <O, T>(
  retrieveFn: (...args: any[]) => Promise<OperationResponse<O>>,
  {
    transform = noopTransform,
    onSuccess = noopCallback,
    onError = noopCallback,
    fetchOnChange = [],
  }: useRetrieveHandlerProps<O, T> = {}
) => {
  const [data, setData] = useState<T>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const handleRetrieve = useCallback(
    async (...args: any[]) => {
      setIsLoading(true);
      try {
        const response = await retrieveFn(...args);

        // TODO: sometimes response is an <OperationResponse<O>>
        // but some other it's already <O>, thus the workaround. I have
        // to look into this, it could be a bug in openapi-client-axios.
        const sanitizedResponse = (response?.data ?? response) as O;
        const transformedResponse = await transform(sanitizedResponse);
        setData(transformedResponse);
        setIsLoading(false);
        onSuccess?.(transformedResponse);
      } catch (error) {
        setIsLoading(false);
        setIsError(true);
        onError?.(error);
        throw error;
      }
    },
    [onError, retrieveFn, transform]
  );

  useEffect(() => {
    if (data || isError) return;
    handleRetrieve();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isError, ...(fetchOnChange || [])]);

  return [data, isLoading, isError] as const;
};
