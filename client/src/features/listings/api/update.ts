import { api } from '@/lib/api';

import { Client, Components, Paths } from '@/types/openapi';
import { fileToBase64 } from '@/utils/base64';
import { compressImage } from '@/utils/compressor';
import { OperationResponse } from 'openapi-client-axios';
import { Allergen } from '../types/allergens';
import { Feature } from '../types/features';

export type UpdateListingDTO = Omit<
  Components.Schemas.PatchedListingCreateRequest,
  'images' | 'allergens' | 'features'
> & {
  images: File[];
  allergens?: Allergen[];
  features?: Feature[];
};

export const updateListing = async (
  params: { id: number },
  data: UpdateListingDTO
): Promise<OperationResponse<Paths.ListingsPartialUpdate.Responses.$200>> => {
  const client = await api.getClient<Client>();
  return await client.listings_partial_update(
    { id: params.id },
    {
      title: data.title,
      description: data.description || null,
      images: await Promise.all(
        data.images.map(async (i: File) => {
          const compressedImage = await compressImage(i);
          const base64image = await fileToBase64(compressedImage);
          return { image: base64image };
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
    }
  );
};
