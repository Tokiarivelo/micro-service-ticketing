import { z } from 'zod';

const signup = z
  .object({
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
  })
  .partial();

export const SignUpSchema = signup.required();

export type SignUpInput = z.infer<typeof SignUpSchema>;
