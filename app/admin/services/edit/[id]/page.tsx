'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import LoadingSpinner from '@/components/admin/LoadingSpinner'

interface Service {
  id: string
  title: string
  price: number
  duration: string
  description: string
  features: string[]
  image_url: string
}

export default function EditServicePage() {
  const { id } = useParams()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [service, setService] = useState<Service | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    price: 0,
    duration: '',
    description: '',
    features: [''],
    image_url: '',
    imageFile: null as File | null
  })

  useEffect(() => {
    const fetchService = async () => {
      setLoading(true)
      const { data, error } = await supabase.from('services').select('*').eq('id', id).single()
      if (error) {
        console.error('Fetch error:', error)
        return
      }
      if (data) {
        setService(data)
        setFormData({
          title: data.title,
          price: data.price,
          duration: data.duration,
          description: data.description,
          features: data.features || [''],
          image_url: data.image_url,
          imageFile: null
        })
      }
      setLoading(false)
    }

    if (id) fetchService()
  }, [id])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: Number(e.target.value) }))
  }

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...formData.features]
    newFeatures[index] = value
    setFormData(prev => ({ ...prev, features: newFeatures }))
  }

  const addFeature = () => {
    setFormData(prev => ({ ...prev, features: [...prev.features, ''] }))
  }

  const removeFeature = (index: number) => {
    const newFeatures = formData.features.filter((_, i) => i !== index)
    setFormData(prev => ({ ...prev, features: newFeatures }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      let finalImageUrl = formData.image_url

      if (formData.imageFile) {
        const ext = formData.imageFile.name.split('.').pop()
        const fileName = `${Date.now()}.${ext}`
        const filePath = `services/${fileName}`

        const { error: uploadError } = await supabase
          .storage
          .from('service-images')
          .upload(filePath, formData.imageFile, {
            upsert: true
          })

        if (uploadError) throw uploadError

        const { data: publicUrlData } = supabase
          .storage
          .from('service-images')
          .getPublicUrl(filePath)

        finalImageUrl = publicUrlData.publicUrl
      }

      const filteredFeatures = formData.features.filter(f => f.trim() !== '')

      const { error } = await supabase
        .from('services')
        .update({
          title: formData.title,
          price: formData.price,
          duration: formData.duration,
          description: formData.description,
          features: filteredFeatures,
          image_url: finalImageUrl
        })
        .eq('id', id)

      if (error) throw error

      await revalidatePaths(['/', '/services'])
      router.push('/admin/services')
    } catch (error: any) {
      console.error('Update error:', error)
      alert('Failed to update service: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  const revalidatePaths = async (paths: string[]) => {
    try {
      await fetch('/api/revalidate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.REVALIDATE_SECRET}`
        },
        body: JSON.stringify({ paths })
      })
    } catch (error) {
      console.error('Revalidation error:', error)
    }
  }

  if (loading) {
    return <div className="flex justify-center py-8"><LoadingSpinner /></div>
  }

  if (!service) {
    return <div className="text-white text-center mt-10">Service not found.</div>
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-6 text-white">
      <h1 className="text-2xl font-bold mb-4">Edit Service</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm mb-1">Title</label>
          <input type="text" name="title" value={formData.title} onChange={handleInputChange} required
            className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white" />
        </div>
        <div>
          <label className="block text-sm mb-1">Price (£)</label>
          <input type="number" name="price" value={formData.price} onChange={handleNumberChange} required
            className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white" />
        </div>
        <div>
          <label className="block text-sm mb-1">Duration</label>
          <input type="text" name="duration" value={formData.duration} onChange={handleInputChange} required
            className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white" />
        </div>
        <div>
          <label className="block text-sm mb-1">Image URL</label>
          <input type="text" name="image_url" value={formData.image_url} onChange={handleInputChange}
            className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white mb-2" />
          <input type="file" accept="image/*" onChange={(e) =>
            setFormData(prev => ({ ...prev, imageFile: e.target.files?.[0] || null }))
          } className="text-sm" />
        </div>
        <div>
          <label className="block text-sm mb-1">Description</label>
          <textarea name="description" value={formData.description} onChange={handleInputChange} rows={3} required
            className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white" />
        </div>
        <div>
          <label className="block text-sm mb-1">Features</label>
          <div className="space-y-2">
            {formData.features.map((feature, index) => (
              <div key={index} className="flex gap-2">
                <input type="text" value={feature} onChange={(e) => handleFeatureChange(index, e.target.value)}
                  className="flex-1 bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white" />
                {formData.features.length > 1 && (
                  <button type="button" onClick={() => removeFeature(index)} className="text-red-400">×</button>
                )}
              </div>
            ))}
            <button type="button" onClick={addFeature} className="text-sm text-yellow-400">+ Add feature</button>
          </div>
        </div>
        <div className="flex justify-between mt-6">
          <button type="button" onClick={() => router.push('/admin/services/add')}
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-500">Cancel</button>
          <button type="submit" className="bg-faded-gold text-black px-4 py-2 rounded hover:bg-yellow-500">
            {loading ? 'Saving...' : 'Update Service'}
          </button>
        </div>
      </form>
    </div>
  )
}
