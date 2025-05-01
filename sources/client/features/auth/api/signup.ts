// features/auth/api/login.ts
import { User } from '@/dto/auth/user';
import { api } from '@/lib/axios';
export const signup = (data: User) => api.post<User>('/api/users/signup', data);
