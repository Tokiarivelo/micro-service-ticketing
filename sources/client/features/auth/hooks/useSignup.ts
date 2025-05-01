// features/auth/hooks/useLogin.ts
import { useMutation } from '@tanstack/react-query';
import { signup } from '../api/signup';
import { signupAction } from '../acions/signup';
import { formatToErrorType } from '@/lib/format-to-error-type';
import { FormEvent, useState } from 'react';
import { ErrorType } from '@/types/error-type';
import { useRouter } from 'next/navigation';

export const useSignup = () => {
  const [error, setError] = useState<ErrorType | null>(null);
  const router = useRouter();
  const mutation = useMutation({
    mutationKey: ['signUp'],
    mutationFn: async (payload: FormData) => {
      // 2. validation
      const dataSchema = await signupAction(payload);

      // 4. appel au service/API
      return signup(dataSchema);
    },
    onError: async (err) => {
      const errorType = await formatToErrorType(err);
      setError(errorType);
    },
    onSuccess: (data) => {
      // succès : nav, toast, invalidation de cache…
      setError(null);
      router.replace('/login');
    },
  });

  return { ...mutation, error };
};

export const useSignupForm = () => {
  const { mutate: signup, isPending, error } = useSignup();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    signup(formData);
  };

  return { handleSubmit, isPending, error };
};
