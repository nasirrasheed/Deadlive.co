'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import LoadingSpinner from '@/components/admin/LoadingSpinner'

export default function EditEventPage() {
  const { id } = useParams() as { id: string }
  const router = useRouter()

  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    date: '',
    price: 0,
    category: '',
    description: '',
    image_url: '',
    imageFile: null as File | null,
  })

  useEffect(() => {
    fetchEvent()
  }, [])

  const fetchEvent = async () => {
    const { data, error } = await supabase.from('events').select('*').eq('id', id).single()
    if (error || !data) {
      alert('Failed to load event.')
      router.push('/admin/events')
      return
    }

    setFormData({
      title: data.title,
      location: data.location,
      date: data.date,
      price: data.price,
      category: data.category,
      description: data.description,
      image_url: data.image_url,
      imageFile: null,
    })

    setLoading(false)
  }

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: +e.target.value }))
  }

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      imageFile: e.target.files?.[0] || null,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    let imageUrl = formData.image_url

    if (formData.imageFile) {
      const ext = formData.imageFile.name.split('.').pop()
      const fileName = `evt-${Date.now()}.${ext}`
      const filePath = `event-images/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('event-images')
        .upload(filePath, formData.imageFile)

      if (uploadError) {
        alert('Image upload failed.')
        setLoading(false)
        return
      }

      const { data: urlData } = await supabase.storage
        .from('event-images')
        .getPublicUrl(filePath)

      imageUrl = urlData?.publicUrl || ''
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
        image_url: imageUrl,
      })
      .eq('id', id)

    if (error) {
      alert('Failed to update event: ' + error.message)
    } else {
      alert('Event updated successfully.')
      router.push('/admin/events/add')
    }

    setLoading(false)
  }

  if (loading) return <LoadingSpinner />

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-white mb-4">Edit Event</h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-gray-800 p-4 rounded">
        <input name="title" value={formData.title} onChange={handleInput} placeholder="Title" required className="w-full p-2 bg-gray-900 text-white rounded"/>
        <input name="location" value={formData.location} onChange={handleInput} placeholder="Location" required className="w-full p-2 bg-gray-900 text-white rounded"/>
        <input name="date" type="date" value={formData.date} onChange={handleInput} required className="w-full p-2 bg-gray-900 text-white rounded"/>
        <input name="price" type="number" value={formData.price} onChange={handleNumber} placeholder="Price" required className="w-full p-2 bg-gray-900 text-white rounded"/>
        
        <select name="category" value={formData.category} onChange={handleInput} required className="w-full p-2 bg-gray-900 text-white rounded">
          <option value="Ghost Hunts">Ghost Hunts</option>
          <option value="Psychic Nights">Psychic Nights</option>
          <option value="Workshops">Workshops</option>
          <option value="Tours">Tours</option>
          <option value="Private Events">Private Events</option>
        </select>

        <textarea name="description" value={formData.description} onChange={handleInput} placeholder="Description" required className="w-full p-2 bg-gray-900 text-white rounded" />

        <input name="image_url" value={formData.image_url} onChange={handleInput} placeholder="Image URL (optional)" className="w-full p-2 bg-gray-900 text-white rounded"/>
        <input type="file" accept="image/*" onChange={handleFile} className="text-white"/>

        <div className="flex gap-2">
          <button type="button" onClick={() => router.back()} className="flex-1 bg-gray-600 p-2 rounded">Cancel</button>
          <button type="submit" className="flex-1 bg-yellow-500 p-2 rounded" disabled={loading}>
            {loading ? 'Saving...' : 'Update'}
          </button>
        </div>
      </form>
    </div>
  )
}
