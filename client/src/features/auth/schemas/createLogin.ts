import { z } from 'zod';

export const createLoginSchema = z.object({
  email: z.string().email('La dirección de correo electrónico no es válida'),
  password: z.string().min(1, 'Introduce tu contraseña'),
});
