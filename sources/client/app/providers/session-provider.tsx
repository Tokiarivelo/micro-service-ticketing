import { SessionProvider } from 'next-auth/react';
import { PropsWithChildren } from 'react';

import { auth } from '@/config/auth/auth'; // Ton auth.ts

export default async function AuthSessionProvider({
  children,
}: PropsWithChildren) {
  const session = await auth();

  return <SessionProvider session={session}>{children}</SessionProvider>;
}
