// features/auth/api/login.ts
import { User } from '@/dto/auth/user';
import { api } from '@/lib/axios';
export const getCurrentUser = () => api.get<User>('/api/users/currentuser');
