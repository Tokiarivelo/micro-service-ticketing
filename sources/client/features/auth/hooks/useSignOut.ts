import { useSession, signOut } from 'next-auth/react';
import { useState } from 'react';

export const useSignOut = () => {
  const { data: session, update } = useSession();
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    setLoading(true);
    // déconnecte côté client
    signOut({ callbackUrl: '/' });
    // force next-auth à refetcher la session
    await update();

    setLoading(false);
  };

  return {
    session,
    loading,
    handleSignOut,
  };
};
