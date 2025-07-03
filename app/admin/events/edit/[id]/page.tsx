'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
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

export default function EditEventPage() {
  const { id } = useParams() as { id: string }
  const router = useRouter()

  const [formData, setFormData] = useState<{
    title: string
    location: string
    date: string
    price: number
    category: string
    description: string
    image_url: string
    imageFile: File | null
  }>({
    title: '',
    location: '',
    date: '',
    price: 0,
    category: 'Ghost Hunts',
    description: '',
    image_url: '',
    imageFile: null
  })

  const [loading, setLoading] = useState(true)

  // Fetch event on load
  useEffect(() => {
    if (!id) return

    const fetchEvent = async () => {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        alert('Failed to load event: ' + error.message)
      } else if (data) {
        setFormData({
          title: data.title,
          location: data.location,
          date: data.date.split('T')[0],
          price: data.price,
          category: data.category,
          description: data.description,
          image_url: data.image_url,
          imageFile: null
        })
      }

      setLoading(false)
    }

    fetchEvent()
  }, [id])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' ? Number(value) : value
    }))
  }

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null
    setFormData(prev => ({ ...prev, imageFile: file }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      let finalImageUrl = formData.image_url

      if (formData.imageFile) {
        const ext = formData.imageFile.name.split('.').pop()
        const filename = `event-${Date.now()}.${ext}`
        const path = `event-images/${filename}`

        const { error: uploadErr } = await supabase.storage
          .from('event-images')
          .upload(path, formData.imageFile)

        if (uploadErr) throw uploadErr

        const { data: urlData } = await supabase
          .storage
          .from('event-images')
          .getPublicUrl(path)

        finalImageUrl = urlData.publicUrl
      }

      const { error } = await supabase
        .from('events')
        .update({
          title: formData.title,
          location: formData.location,
          date: formData.date,
          price: formData.price,
          category: formData.category,
          description: formData.description,
          image_url: finalImageUrl
        })
        .eq('id', id)

      if (error) throw error

      await fetch('/api/revalidate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paths: ['/', '/events'] })
      })

      router.push('/admin/events')
    } catch (err: any) {
      alert('Update failed: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  if (!id) return <div className="p-6 text-white">Invalid event ID</div>
  if (loading) return <LoadingSpinner />

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-white">Edit Event</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="title" value={formData.title} onChange={handleChange} placeholder="Title" required className="w-full p-2 bg-gray-900 rounded" />
        <input name="location" value={formData.location} onChange={handleChange} placeholder="Location" required className="w-full p-2 bg-gray-900 rounded" />
        <input name="date" type="date" value={formData.date} onChange={handleChange} required className="w-full p-2 bg-gray-900 rounded" />
        <input name="price" type="number" value={formData.price} onChange={handleChange} placeholder="Price" required className="w-full p-2 bg-gray-900 rounded" />

        <select name="category" value={formData.category} onChange={handleChange} className="w-full p-2 bg-gray-900 rounded">
          <option>Ghost Hunts</option>
          <option>Workshops</option>
          <option>Tours</option>
          <option>Private Events</option>
        </select>

        <textarea name="description" value={formData.description} onChange={handleChange} rows={3} placeholder="Description" required className="w-full p-2 bg-gray-900 rounded" />
        <input name="image_url" value={formData.image_url} onChange={handleChange} placeholder="Image URL (optional)" className="w-full p-2 bg-gray-900 rounded" />
        <input type="file" accept="image/*" onChange={handleFile} className="text-gray-300" />

        <div className="flex space-x-2">
          <button type="button" onClick={() => router.push('/admin/events/add')} className="flex-1 bg-gray-700 p-2 rounded">Cancel</button>
          <button type="submit" className="flex-1 bg-faded-gold p-2 rounded">{loading ? 'Saving...' : 'Save Changes'}</button>
        </div>
      </form>
    </div>
  )
}
