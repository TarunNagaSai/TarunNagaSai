import type { Metadata } from 'next';
import { ProfileCard } from '@/components/card/ProfileCard';

export const metadata: Metadata = {
  title: 'Profile Card',
  robots: { index: false, follow: false },
};

export default function CardPage() {
  return (
    <main className="relative z-10 flex min-h-screen items-center justify-center px-4 py-16">
      <ProfileCard />
    </main>
  );
}
