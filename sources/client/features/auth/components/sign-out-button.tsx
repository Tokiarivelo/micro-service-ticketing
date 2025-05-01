'use client';

import { useSignOut } from '../hooks/useSignOut';

export function SignOutButton() {
  const { session, loading, handleSignOut } = useSignOut();

  if (!session) {
    return null;
  }

  return (
    <button
      type='submit'
      onClick={handleSignOut}
      className='cursor-pointer p-2 bg-red-500 text-white rounded'
    >
      {loading ? 'Déconnexion...' : 'Se déconnecter'}
    </button>
  );
}
