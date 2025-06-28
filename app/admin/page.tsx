'use client'

import { useAuth } from '@/hooks/useAuth'

export default function AdminDashboard() {
  const { user, loading } = useAuth()

  // Show loading spinner
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        <div className="text-lg">Loading dashboard...</div>
      </div>
    )
  }

  // Show message if user is not authenticated
  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        <div className="text-lg">Please sign in to access the dashboard.</div>
      </div>
    )
  }

  const stats = [
    { name: 'Total Events', value: '24', change: '+12%', icon: '🎭' },
    { name: 'Active Services', value: '8', change: '+5%', icon: '🔮' },
    { name: 'Blog Posts', value: '15', change: '+8%', icon: '📝' },
    { name: 'Reviews', value: '127', change: '+23%', icon: '⭐' },
  ]

  const recentActivity = [
    { action: 'New event created', item: 'Pendle Hill Witch Hunt', time: '2 hours ago' },
    { action: 'Review approved', item: 'Sarah Mitchell review', time: '4 hours ago' },
    { action: 'Blog post published', item: 'The Haunting of Borley Rectory', time: '1 day ago' },
    { action: 'Service updated', item: 'Tarot Reading pricing', time: '2 days ago' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">
          Welcome back, {user.email?.split('@')[0]}!
        </h1>
        <p className="text-gray-400">
          Here&apos;s what&apos;s happening with your paranormal business today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">{stat.name}</p>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
              </div>
              <div className="text-2xl">{stat.icon}</div>
            </div>
            <div className="mt-2">
              <span className="text-sm text-green-400">{stat.change}</span>
              <span className="text-sm text-gray-400"> from last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-gray-800 rounded-lg border border-gray-700">
        <div className="px-6 py-4 border-b border-gray-700">
          <h2 className="text-lg font-semibold text-white">Recent Activity</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b border-gray-700 last:border-b-0">
                <div>
                  <p className="text-white font-medium">{activity.action}</p>
                  <p className="text-sm text-gray-400">{activity.item}</p>
                </div>
                <span className="text-sm text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <button className="bg-faded-gold text-black p-4 rounded-lg font-semibold hover:bg-yellow-500 transition-colors">
          Create New Event
        </button>
        <button className="bg-gray-800 text-white p-4 rounded-lg font-semibold hover:bg-gray-700 transition-colors border border-gray-700">
          Add Service
        </button>
        <button className="bg-gray-800 text-white p-4 rounded-lg font-semibold hover:bg-gray-700 transition-colors border border-gray-700">
          Write Blog Post
        </button>
        <button className="bg-gray-800 text-white p-4 rounded-lg font-semibold hover:bg-gray-700 transition-colors border border-gray-700">
          Manage Reviews
        </button>
      </div>
    </div>
  )
}
