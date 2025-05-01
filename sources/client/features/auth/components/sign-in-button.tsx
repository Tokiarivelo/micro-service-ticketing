'use client';

import { useFormStatus } from 'react-dom';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';

export function SignInButton() {
  const { pending } = useFormStatus();
  const pathname = usePathname();
  const { data: session, status } = useSession();

  console.log('session :>> ', session);

  // On cache le bouton si on est déjà sur /login
  if (pathname === '/login') return null;

  if (status === 'loading') {
    return <p>Chargement...</p>;
  }

  if (session) {
    return (
      <div>
        <p>Bienvenue {session.user?.email}</p>
      </div>
    );
  }

  return (
    <Link href={'/login'} className='p-2 bg-green-500 text-white rounded'>
      {pending ? 'Connexion en cours...' : 'Se connecter'}
    </Link>
  );
}
