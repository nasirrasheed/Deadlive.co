'use client';

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import LoadingSpinner from '@/components/admin/LoadingSpinner';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    // Only redirect after initial auth check completes
    if (!loading) {
      setInitialized(true);
      if (!user) {
        router.push('/admin/login');
      }
    }
  }, [user, loading, router]);

  if (loading || !initialized) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-black">
        <LoadingSpinner />
      </div>
    );
  }

  return <div>{children}</div>;
}