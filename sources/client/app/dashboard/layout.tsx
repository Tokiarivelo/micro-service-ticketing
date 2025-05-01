import { SignOutButton } from '@/features/auth/components/sign-out-button';
import type { Metadata } from 'next';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div>
        <SignOutButton />
      </div>
      <div>{children}</div>
    </div>
  );
}
