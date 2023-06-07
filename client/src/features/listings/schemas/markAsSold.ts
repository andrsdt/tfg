import { parseMoneyString } from '@/utils/formatters';
import { z } from 'zod';

export const markAsSoldSchema = z.object({
  quantity: z
    .number({
      invalid_type_error: '',
    })
    .min(1, 'Debes vender al menos 1 producto')
    .max(10000, 'No puedes vender más de 10.000 productos'),
  total_price: z.preprocess(
    parseMoneyString,
    z
      .number({
        invalid_type_error: '',
      })
      .min(0, 'El precio no puede ser negativo')
      .max(100000, 'No puedes vender productos de más de 1000€')
  ),
  listing_id: z.number(),
  consumer_id: z.optional(z.number()),
});
