'use server';

import { formatToErrorType } from '@/lib/format-to-error-type';
import { signIn } from '@/config/auth/auth';
import { ErrorType } from '@/types/error-type';
import axios from 'axios';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { SignInSchema } from '../schemas/signin';

export const signInAction = async (formData: FormData) => {
  const data = Object.fromEntries(formData.entries());
  const parsedData = SignInSchema.safeParse(data);

  // If form validation fails, return errors early. Otherwise, continue.
  if (!parsedData.success) {
    // 3. throw pour que useMutation.onError le capture
    throw formatToErrorType(parsedData.error.errors);
  }

  return parsedData.data;
};

export const logIn = async (
  prevState: ErrorType | undefined,
  formData: FormData
) => {
  const { callbackUrl, ...credentials } = await signInAction(formData);
  try {
    const result = await signIn('credentials', {
      ...credentials,
      redirect: false,
    });
    if (result.error) {
      return [{ message: 'Invalid credentials' }];
    }

    console.log('callbackUrl :>> ', callbackUrl);
  } catch (error: any) {
    console.log('error  message:>> ', error);

    const errorCause = error['cause']?.err;
    if (axios.isAxiosError(errorCause)) {
      return formatToErrorType(errorCause);
    }

    console.log('errorCause 2 :>> ', errorCause);

    return [{ message: 'Invalid credentials' }];
  }

  revalidatePath(callbackUrl);
  redirect(callbackUrl); // Redirection après connexion réussie
};
