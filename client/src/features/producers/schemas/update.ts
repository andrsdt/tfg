import { z } from 'zod';

export const updateSchema = z.object({
  biography: z.optional(z.string()),
});
