import { z } from 'zod';

export const createReviewSchema = z.object({
  rating: z.number().min(1).max(5),
  comment: z.optional(
    z.string().max(500, {
      message: 'El comentario no puede tener más de 500 caracteres',
    })
  ),
  order: z.number(),
});
