import { z } from 'zod';
import { Target } from '../types/targets';
import { ListboxValueType } from '@/components/Elements';

export const reportOptions = [
  { identifier: 'PRODUCER', translation: 'El productor' },
  { identifier: 'ORDER', translation: 'Mi pedido' },
] as ListboxValueType<Target>[];

export const createReportSchema = z.object({
  description: z
    .string()
    .min(1, 'La descripción no puede estar vacía')
    .max(2000, 'La descripción no puede contener más de 2000 caracteres'),
  // Target: take an element from the options array and keep the identifier as a string
  target: z
    .string()
    .refine((val: Target) =>
      reportOptions.map((o) => o.identifier).includes(val)
    ),
  reported: z.number().optional(),
  order: z.number().optional(),
});
