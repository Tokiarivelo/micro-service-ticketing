// features/auth/api/login.ts
import { User } from '@/dto/auth/user';
import { api } from '@/lib/axios';
export const signin = (data: User) => api.post<User>('/api/users/signin', data);
