import { api } from '@/lib/api';

import { Client, Components, Paths } from '@/types/openapi';
import { OperationResponse } from 'openapi-client-axios';
import { Allergen } from '../types/allergens';
import { Feature } from '../types/features';
import { fileToBase64 } from '@/utils/base64';
import { compressImage } from '@/utils/compressor';

export type CreateListingDTO = Omit<
  Components.Schemas.ListingCreateRequest,
  'images' | 'allergens' | 'features'
> & {
  images: File[];
  allergens?: Allergen[];
  features?: Feature[];
};

export const createListing = async (
  data: CreateListingDTO
): Promise<OperationResponse<Paths.ListingsCreate.Responses.$201>> => {
  const client = await api.getClient<Client>();
  return await client.listings_create(null, {
    title: data.title,
    description: data.description || null,
    images: await Promise.all(
      data.images.map(async (i: File) => {
        const compressedImage = await compressImage(i);
        const compressedBase64image = await fileToBase64(compressedImage);
        return { image: compressedBase64image };
      })
    ),
    unit: data.unit,
    available_quantity: data.available_quantity,
    allergens: data.allergens?.map((allergen) => {
      return { allergen };
    }),
    features: data.features?.map((feature) => {
      return { feature };
    }),
    price_per_unit: data.price_per_unit,
    // The user enters the weight per unit in kg, but the API expects it in grams
    g_per_unit: data.unit === 'KG' ? 1000 : data.g_per_unit || 0,
  });
};
