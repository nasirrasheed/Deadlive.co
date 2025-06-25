'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: '📊' },
  { name: 'Events', href: '/admin/events', icon: '🎭' },
  { name: 'Services', href: '/admin/services', icon: '🔮' },
  { name: 'Blog Posts', href: '/admin/blog', icon: '📝' },
  { name: 'Reviews', href: '/admin/reviews', icon: '⭐' },
  { name: 'Stripe Setup', href: '/admin/stripe', icon: '💳' },
]

export default function Sidebar() {
  const pathname = usePathname()
  const { signOut } = useAuth()

  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <div className="flex flex-col w-64 bg-gray-900 border-r border-gray-800">
      <div className="flex items-center justify-center h-16 px-4 border-b border-gray-800">
        <h1 className="font-cinzel text-xl font-bold text-faded-gold">
          DeadLive Admin
        </h1>
      </div>
      
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                isActive
                  ? 'bg-faded-gold text-black'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <span className="mr-3 text-lg">{item.icon}</span>
              {item.name}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-gray-800">
        <button
          onClick={handleSignOut}
          className="w-full flex items-center px-4 py-3 text-sm font-medium text-gray-300 rounded-lg hover:bg-gray-800 hover:text-white transition-colors"
        >
          <span className="mr-3 text-lg">🚪</span>
          Sign Out
        </button>
      </div>
    </div>
  )
}