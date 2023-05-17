import { z } from 'zod';

export const createSchema = z.object({
  title: z
    .string()
    .min(1, ' ')
    .max(100, 'El título no puede tener más de 100 caracteres'),
  description: z
    .string()
    .max(2000, 'La descripción no puede tener más de 2000 caracteres')
    .nullable(),
  images: z
    // TODO: array of files
    .array(z.any())
    .min(1, 'Introduce al menos una imagen')
    .max(10, 'No puedes introducir más de 10 imágenes'),
  allergens: z.optional(z.array(z.string())),
  features: z.optional(z.array(z.string())),
  // TODO: validate as type enum
  unit: z.string().min(1, ' '),
  // TODO: transform to cents if comes in EUR
  price_per_unit: z
    .number({ invalid_type_error: '' })
    .min(0, 'El precio no puede ser negativo')
    .max(100000, 'No puedes vender productos de más de 1000€'),
  g_per_unit: z.any(),
  // g_per_unit: z
  // .number({ invalid_type_error: '' })
  // .min(0, 'El peso de cada unidad no puede ser negativo')
  // .max(100000, 'No puedes vender unidades de más de 100 kg'),
  available_quantity: z
    .number({
      invalid_type_error: '',
    })
    .min(1, 'Debes vender al menos 1 producto')
    .max(10000, 'No puedes vender más de 10.000 productos'),
});