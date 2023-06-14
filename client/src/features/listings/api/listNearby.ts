import useLocation from '@/hooks/useLocation';
import { getApiClient } from '@/lib/api';

import { formatCoordinatesAsWKT } from '@/utils/formatters';
import useSWR from 'swr';
import { Listing } from '../types/listings';
import { useAuth } from '@/hooks/useAuth';

export const useListNearbyListings = () => {
  // Use SWR to cache the response and refresh it periodically
  const { user } = useAuth();
  const { location } = useLocation();

  const payload = {
    order_by: '-updated_at' as any,
    // distance_order: 'asc',
    distance: '10000' as any, // meters
    location: location && formatCoordinatesAsWKT(location),
    // exclude_mine: true,
  };

  const { data, isLoading, error } = useSWR(
    // Send the petition only if the user has a location on their
    // profile or if they accepted to share their device's location
    user?.location || location,
    async () => await (await getApiClient()).listings_list(payload)
  );

  const sanitizedResponse = (data?.data ?? data) as Listing[];

  return {
    nearbyListings: sanitizedResponse,
    isLoading,
    isError: error,
  };
};
