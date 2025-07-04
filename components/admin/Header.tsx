'use client';

import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const { user } = useAuth();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const menuItems = [
    { label: 'Dashboard', href: '/admin' },
    { label: 'Events', href: '/admin/events/add' },
    { label: 'Blog', href: '/admin/blog/add' },
    { label: 'Reviews', href: '/admin/reviews' },
    { label: 'Services', href: '/admin/services/add' },
  ];

  return (
    <header className="bg-gray-900 border-b border-gray-800 px-4 sm:px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Branding */}
        <div>
          <h2 className="text-xl font-semibold text-white">Admin Panel</h2>
          <p className="text-sm text-gray-400">Manage your paranormal business</p>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-gray-400 hover:text-white"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* User Info */}
        <div className="hidden md:flex items-center space-x-4">
          <div className="text-right">
            <p className="text-sm font-medium text-white">Welcome back!</p>
            <p className="text-xs text-gray-400">{user?.email}</p>
          </div>
          <div className="w-8 h-8 bg-faded-gold rounded-full flex items-center justify-center">
            <span className="text-black font-semibold text-sm">
              {user?.email?.charAt(0).toUpperCase()}
            </span>
          </div>
        </div>
      </div>

      {/* Nav Menu (Desktop + Mobile) */}
      <nav
        className={clsx(
          'mt-4 md:mt-2 space-y-2 md:space-y-0 md:flex md:space-x-6',
          menuOpen ? 'block' : 'hidden md:block'
        )}
      >
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={clsx(
              'block text-sm font-medium',
              pathname === item.href
                ? 'text-faded-gold underline'
                : 'text-gray-300 hover:text-white'
            )}
          >
            {item.label}
          </Link>
        ))}

        {/* Show user info inside menu on mobile */}
        <div className="md:hidden mt-4 border-t border-gray-800 pt-3 flex items-center justify-between">
          <div className="text-sm text-gray-300">
            <p>{user?.email}</p>
          </div>
          <div className="w-8 h-8 bg-faded-gold rounded-full flex items-center justify-center">
            <span className="text-black font-semibold text-sm">
              {user?.email?.charAt(0).toUpperCase()}
            </span>
          </div>
        </div>
        
      </nav>
    </header>
  );
}
