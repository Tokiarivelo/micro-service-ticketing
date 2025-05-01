'use server';

import { formatToErrorType } from '@/lib/format-to-error-type';
import { SignUpSchema } from '../schemas/signup';

export const signupAction = async (formData: FormData) => {
  const data = Object.fromEntries(formData.entries());
  const parsedData = SignUpSchema.safeParse(data);

  // If form validation fails, return errors early. Otherwise, continue.
  if (!parsedData.success) {
    // 3. throw pour que useMutation.onError le capture
    throw formatToErrorType(parsedData.error.errors);
  }

  return parsedData.data;
};
