import { ErrorType } from '@/types/error-type';
import axios from 'axios';

export const formatToErrorType = async <T>(
  error: T | Error
): Promise<ErrorType> => {
  console.log('error :>> ', error);

  if (axios.isAxiosError(error)) {
    console.log(
      'error.response?.data?.errors :>> ',
      error.response?.data?.errors
    );
    return (
      error.response?.data?.errors || [
        { message: 'An unknown error occurred.' },
      ]
    );
  }
  if (Array.isArray(error)) {
    return error.map((err) => ({
      message: err.message,
      field: err.field,
    }));
  }

  if (typeof error === 'object' && error !== null) {
    return Object.entries(error).map(([key, value]) => ({
      message: value as string,
      field: key,
    }));
  }

  return [{ message: 'An unknown error occurred.' }];
};
