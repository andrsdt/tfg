import { z } from 'zod';

const lettersOnly = /^[A-zÀ-ÖØ-öø-ÿ]+( ?[A-zÀ-ÖØ-öø-ÿ]+)?$/;

export const createSignupSchema = z.object({
  email: z.string().email('La dirección de correo electrónico no es válida'),
  password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'),
  // FirstName can't have numbers
  firstName: z.string().min(2, ' ').regex(lettersOnly, ' '),
  lastName: z.string().min(2, ' ').regex(lettersOnly, ' '),
});
