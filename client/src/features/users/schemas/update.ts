import { z } from 'zod';

export const updateSchema = z.object({
  first_name: z.optional(z.string()),
  last_name: z.optional(z.string()),
  phone: z.optional(z.string()).nullable(),
  // .min(9, { message: 'El teléfono debe tener 9 dígitos' }),
  location: z.optional(z.string()),
  // .nonempty({ message: 'La ubicación es obligatoria' }),
  photo: z.optional(z.string()),
});
