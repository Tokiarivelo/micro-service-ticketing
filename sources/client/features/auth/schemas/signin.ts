import { z } from 'zod';

export const SignInSchema = z.object({
  email: z
    .string({
      invalid_type_error: 'This field is required.',
    })
    .email('This is not a valid email...'),
  password: z
    .string({
      invalid_type_error: 'This field is required.',
    })
    .min(6, 'Password must be at least 6 characters long.'),
  callbackUrl: z.string(),
});
