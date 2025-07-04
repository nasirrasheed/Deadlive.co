'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import LoadingSpinner from '@/components/admin/LoadingSpinner'

interface Event {
  id: string
  title: string
  location: string
  date: string
  price: number
  category: string
  description: string
  image_url: string
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    date: '',
    price: 0,
    category: 'Ghost Hunts',
    description: '',
    image_url: '',
    imageFile: null as File | null,
  })

  const router = useRouter()

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('date', { ascending: true })

    if (error) console.error('Error fetching:', error)
    else setEvents(data || [])
    setLoading(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this event?')) return
    setLoading(true)
    const { error } = await supabase.from('events').delete().eq('id', id)
    if (error) alert('Delete failed: ' + error.message)
    else setEvents(events.filter(e => e.id !== id))
    await revalidate(['/','/events'])
    setLoading(false)
  }

  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: +e.target.value }))
  }

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, imageFile: e.target.files?.[0] || null }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    let imageUrl = formData.image_url
    if (formData.imageFile) {
      const ext = formData.imageFile.name.split('.').pop()
      const fn = `evt-${Date.now()}.${ext}`
      const path = `event-images/${fn}`
      const { error: upErr } = await supabase.storage.from('event-images').upload(path, formData.imageFile)
      if (upErr) return alert(upErr.message)
      const { data: urlData } = await supabase.storage.from('event-images').getPublicUrl(path)
      imageUrl = urlData.publicUrl
    }

    const { data, error } = await supabase.from('events').insert([{
      title: formData.title,
      location: formData.location,
      date: formData.date,
      price: formData.price,
      category: formData.category,
      description: formData.description,
      image_url: imageUrl,
    }]).select()

    if (error) alert('Create failed: ' + error.message)
    else {
      setEvents([data![0], ...events])
      await revalidate(['/','/events'])
      setFormData({
        title:'', location:'', date:'', price:0, category:'Ghost Hunts',
        description:'', image_url:'', imageFile:null,
      })
      setShowForm(false)
    }

    setLoading(false)
  }

  const revalidate = (paths: string[]) =>
    fetch('/api/revalidate', {
      method: 'POST',
      headers:{ 'Content-Type':'application/json' },
      body: JSON.stringify({ paths })
    }).catch(console.error)

  return (
    <div className="space-y-6 p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl text-white">Events Management</h1>
        <button
          className="bg-yellow-500 px-3 py-1 rounded"
          onClick={() => setShowForm(true)}
          disabled={loading}
        >Add Event</button>
      </div>

      {loading && !showForm ? (
        <LoadingSpinner />
      ) : (
        <table className="min-w-full text-sm text-left text-gray-300">
          <thead className="bg-gray-900 text-xs uppercase text-gray-400">
            <tr>
              <th className="px-6 py-3">Title</th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Price</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-gray-800 divide-y divide-gray-700">
            {events.map(e => (
              <tr key={e.id} className="hover:bg-gray-700">
                <td className="px-6 py-4 font-medium">{e.title}</td>
                <td className="px-6 py-4">{new Date(e.date).toLocaleDateString()}</td>
                <td className="px-6 py-4">£{e.price}</td>
                <td className="px-6 py-4 space-x-2">
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs"
                    onClick={() => router.push(`/admin/events/edit/${e.id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
                    onClick={() => handleDelete(e.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <form onSubmit={handleSubmit} className="bg-gray-800 p-4 rounded space-y-2 w-full max-w-md">
            <h2 className="text-xl text-white">New Event</h2>
            <input name="title" value={formData.title} onChange={handleInput} placeholder="Title" required className="w-full p-2 bg-gray-900 rounded"/>
            <input name="location" value={formData.location} onChange={handleInput} placeholder="Location" required className="w-full p-2 bg-gray-900 rounded"/>
            <input name="date" type="date" value={formData.date} onChange={handleInput} required className="w-full p-2 bg-gray-900 rounded"/>
            <input name="price" type="number" value={formData.price} onChange={handleNumber} placeholder="Price" required className="w-full p-2 bg-gray-900 rounded"/>

            <select name="category" value={formData.category} onChange={handleInput} required className="w-full p-2 bg-gray-900 rounded text-white">
              <option value="Ghost Hunts">Ghost Hunts</option>
              <option value="Psychic Nights">Psychic Nights</option>
              <option value="Workshops">Workshops</option>
              <option value="Tours">Tours</option>
              <option value="Private Events">Private Events</option>
            </select>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleInput}
              placeholder="Description"
              required
              className="w-full p-2 bg-gray-900 rounded"
            />

            <input name="image_url" value={formData.image_url} onChange={handleInput} placeholder="Image URL (optional)" className="w-full p-2 bg-gray-900 rounded"/>
            <input type="file" accept="image/*" onChange={handleFile} className="text-gray-200"/>

            <div className="flex space-x-2">
              <button type="button" onClick={() => setShowForm(false)} className="flex-1 bg-gray-600 p-2 rounded">Cancel</button>
              <button type="submit" className="flex-1 bg-yellow-500 p-2 rounded" disabled={loading}>
                {loading ? 'Saving...' : 'Save'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
