'use client'

import { useAuth } from '@/hooks/useAuth'

export default function Header() {
  const { user } = useAuth()

  return (
    <header className="bg-gray-900 border-b border-gray-800 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">Admin Panel</h2>
          <p className="text-sm text-gray-400">Manage your paranormal business</p>
        </div>
        
        <div className="flex items-center space-x-4">
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
    </header>
  )
}