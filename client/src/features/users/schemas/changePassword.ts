import { z } from 'zod';

export const changePasswordSchema = z.object({
  new_password1: z.string(),
  new_password2: z.string(),
});
