import { getApiClient } from '@/lib/api';

import { Paths } from '@/types/openapi';
import { useSearchParams } from 'next/navigation';
import { OperationResponse } from 'openapi-client-axios';
import { useEffect, useState } from 'react';
import { Listing } from '../types/listings';

export const searchListings = async (
  // TODO: add types when the endpoint is done
  params
): Promise<OperationResponse<Paths.ListingsList.Responses.$200>> => {
  const client = await getApiClient();
  return await client.listings_list(params);
};

export const useSearchListings = () => {
  // hook for getting query params object
  const params = Object.fromEntries(useSearchParams().entries());
  // TODO: replace 'title' with 'q', which interally filters by title, description, and tags

  // use the retrieve handler here?
  // NOTE: is this re-fetched everytime queryParamValues change? it should
  const [listings, setListings] = useState<Listing[]>([]);

  useEffect(() => {
    const fetchListings = async () => {
      const response = await searchListings(params);
      setListings((response.data ?? response) as Listing[]);
    };
    fetchListings();
    // NOTE: we are using JSON.stringify as a workaround to compare objects
    // since we can't pass an object to useEffect's dependency array (the
    // reference will change every render, thus triggering the effect in a
    // loop). This is not the prettiest way to approach the problem though
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(params)]);

  return [listings];
};
