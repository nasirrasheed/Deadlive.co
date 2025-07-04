'use client';

import { useAuth } from '@/hooks/useAuth';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import LoadingSpinner from '@/components/admin/LoadingSpinner';
import Header from '@/components/admin/Header'; // 👈 import your Header

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname(); // 👈 get current path
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!loading) {
      setInitialized(true);
      if (!user && pathname !== '/admin/login') {
        router.push('/admin/login');
      }
    }
  }, [user, loading, router, pathname]);

  if (loading || !initialized) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-black">
        <LoadingSpinner />
      </div>
    );
  }

  // Optional: don't show header on login page
  const showHeader = pathname !== '/admin/login';

  return (
    <div className="min-h-screen bg-black text-white">
      {showHeader && <Header />} {/* 👈 render Header on all admin pages except login */}
      <main className="p-4">{children}</main>
    </div>
  );
}
