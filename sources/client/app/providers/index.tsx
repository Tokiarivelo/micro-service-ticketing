import { PropsWithChildren } from 'react';
import { ReactQueryProvider } from './react-query-provider';
import AuthSessionProvider from './session-provider';

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <AuthSessionProvider>
      <ReactQueryProvider>{children}</ReactQueryProvider>
    </AuthSessionProvider>
  );
}
