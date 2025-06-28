'use client'

import { useState } from 'react'
import LoadingSpinner from '@/components/admin/LoadingSpinner'

interface Event {
  id: string
  title: string
  location: string
  date: string
  price: number
  category: string
  description: string
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([
    {
      id: '1',
      title: 'Pendle Hill Witch Hunt',
      location: 'Lancashire, UK',
      date: '2024-03-15',
      price: 45,
      category: 'Ghost Hunts',
      description: 'Explore the infamous Pendle Hill where the witch trials took place in 1612.'
    },
    {
      id: '2',
      title: 'Tower of London Investigation',
      location: 'London, UK',
      date: '2024-03-22',
      price: 65,
      category: 'Ghost Hunts',
      description: 'Investigate one of England\'s most haunted fortresses after dark.'
    }
  ])
  const [loading, setLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    date: '',
    price: 0,
    category: 'Ghost Hunts',
    description: ''
  })

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this event?')) {
      setLoading(true)
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500))
        setEvents(events.filter(event => event.id !== id))
      } finally {
        setLoading(false)
      }
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: Number(value) }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      const newEvent = {
        id: Date.now().toString(),
        ...formData,
        price: Number(formData.price)
      }
      setEvents([...events, newEvent])
      setFormData({
        title: '',
        location: '',
        date: '',
        price: 0,
        category: 'Ghost Hunts',
        description: ''
      })
      setShowForm(false)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Events Management</h1>
          <p className="text-gray-400">Manage your paranormal events and ghost hunts</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-faded-gold text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition-colors"
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Add New Event'}
        </button>
      </div>

      <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Event
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {events.map((event) => (
                <tr key={event.id} className="hover:bg-gray-700">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-white">{event.title}</div>
                      <div className="text-sm text-gray-400 truncate max-w-xs">{event.description}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-300">{event.location}</td>
                  <td className="px-6 py-4 text-sm text-gray-300">{event.date}</td>
                  <td className="px-6 py-4 text-sm text-gray-300">£{event.price}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-faded-gold text-black">
                      {event.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium space-x-2">
                    <button 
                      className="text-faded-gold hover:text-yellow-400"
                      disabled={loading}
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(event.id)}
                      className="text-red-400 hover:text-red-300"
                      disabled={loading}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-white mb-4">Add New Event</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:border-faded-gold focus:outline-none text-white"
                  placeholder="Event title"
                  required
                  disabled={loading}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:border-faded-gold focus:outline-none text-white"
                  placeholder="Event location"
                  required
                  disabled={loading}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:border-faded-gold focus:outline-none text-white"
                  required
                  disabled={loading}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Price (£)</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleNumberChange}
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:border-faded-gold focus:outline-none text-white"
                  placeholder="45"
                  required
                  min="0"
                  disabled={loading}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:border-faded-gold focus:outline-none text-white"
                  rows={3}
                  required
                  disabled={loading}
                />
              </div>
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 bg-gray-700 text-white py-2 rounded-lg hover:bg-gray-600 transition-colors"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-faded-gold text-black py-2 rounded-lg hover:bg-yellow-500 transition-colors flex justify-center items-center"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <LoadingSpinner className="mr-2" />
                      Creating...
                    </>
                  ) : (
                    'Create Event'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}