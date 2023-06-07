import { z } from 'zod';

export const updateSchema = z.object({
  phone: z.optional(z.string()),
  // .min(9, { message: 'El teléfono debe tener 9 dígitos' }),
  location: z.optional(z.string()),
  // .nonempty({ message: 'La ubicación es obligatoria' }),
});
