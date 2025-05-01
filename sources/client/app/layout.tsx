import type { Metadata } from 'next';
import './globals.css';
import { AppProviders } from './providers';
import { SignInButton } from '@/features/auth/components/sign-in-button';

export const metadata: Metadata = {
  title: {
    template: '%s | Ticketing',
    default: 'Ticketing Dashboard',
  },
  description: 'App for managing tickets',
  keywords: ['ticketing', 'dashboard'],
  authors: [{ name: 'Tokiarivelo' }],
  creator: 'Tokiarivelo',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`antialiased`}>
        <AppProviders>
          <div>
            <SignInButton />
          </div>
          <div>{children}</div>
        </AppProviders>
      </body>
    </html>
  );
}
