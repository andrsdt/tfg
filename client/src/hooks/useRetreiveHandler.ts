import { OperationResponse } from 'openapi-client-axios';
import { useCallback, useEffect, useState } from 'react';

// O = Original type (e.g., a listing object)
// T = Transformed type (e.g., a ListingDTO object)
const noopTransform = async (data) => await data;

type useRetrieveHandlerProps<O, T> = {
  transform?: (data: O) => Promise<T>;
  onError?: (error: any) => void;
};

export const useRetrieveHandler = <O, T>(
  retrieveFn: (...args: any[]) => Promise<OperationResponse<O>>,
  { transform, onError }: useRetrieveHandlerProps<O, T> = {
    transform: noopTransform,
    onError: () => {
      return;
    },
  }
) => {
  const [data, setData] = useState<T>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const handleRetrieve = useCallback(
    async (...args: any[]) => {
      setIsLoading(true);
      try {
        const response = await retrieveFn(...args);

        // TODO: this is supposed to be an <OperationResponse<O>>
        // but it's actually <O>, thus the workaround. I have to
        // look into this, it could be a bug in openapi-client-axios.
        const transformedResponse = await transform(response as O);
        setData(transformedResponse);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setIsError(true);
        onError(error);
        throw error;
      }
    },
    [onError, retrieveFn, transform]
  );

  useEffect(() => {
    if (data || isError) return;
    handleRetrieve();
  }, [handleRetrieve, data, isError]);

  return [data, isLoading, isError] as const;
};
