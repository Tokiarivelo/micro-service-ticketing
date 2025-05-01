import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { signin } from '../../features/auth/api/signin';
import { SignInSchema } from '../../features/auth/schemas/signin';

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,

  providers: [
    Credentials({
      async authorize(credentials) {
        try {
          // 1. validation des données
          const dataSchema = SignInSchema.safeParse(credentials);

          if (dataSchema.success) {
            const { email, password } = dataSchema.data;
            // 2. appel au service/API
            const res = await signin({ email, password });

            if (!res.data) throw new Error('Identifiants invalides');

            const { data } = res;

            console.log('data :>> ', data);

            // 3. on renvoie les données de l'utilisateur
            return data;
          }

          return null;
        } catch (error: any) {
          console.error('Invalid credentials :>> ', error);

          throw error;
        }
      },
    }),
  ],
});
