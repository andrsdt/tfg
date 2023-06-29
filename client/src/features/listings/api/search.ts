import { getApiClient } from '@/lib/api';

import { Paths } from '@/types/openapi';
import { useSearchParams } from 'next/navigation';
import { OperationResponse } from 'openapi-client-axios';
import { useEffect, useState } from 'react';
import { Listing } from '../types/listings';

export const searchListings = async (
  params
): Promise<OperationResponse<Paths.ListingsList.Responses.$200>> => {
  const client = await getApiClient();
  return await client.listings_list(params);
};

export const useSearchListings = () => {
  const params = Object.fromEntries(useSearchParams().entries());

  const [listings, setListings] = useState<Listing[]>([]);

  useEffect(() => {
    const fetchListings = async () => {
      const response = await searchListings(params);
      setListings((response.data ?? response) as Listing[]);
    };
    fetchListings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(params)]);

  return [listings];
};
