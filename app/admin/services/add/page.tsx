'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import LoadingSpinner from '@/components/admin/LoadingSpinner'

interface Service {
  id: string
  title: string
  price: number
  duration: string
  description: string
  features: string[]
  created_at: string
  image_url: string
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    price: 0,
    duration: '',
    description: '',
    features: [''],
    image_url: '',
    imageFile: null as File | null
  })
  const [processingId, setProcessingId] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchServices = async () => {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching services:', error)
      } else {
        setServices(data || [])
      }
      setLoading(false)
    }

    fetchServices()
  }, [])

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this service?')) {
      setProcessingId(id)
      setLoading(true)
      try {
        const { error } = await supabase
          .from('services')
          .delete()
          .eq('id', id)

        if (error) throw error

        setServices(services.filter(service => service.id !== id))
        await revalidatePaths(['/', '/services'])
      } catch (error) {
        console.error('Delete error:', error)
        alert('Failed to delete service')
      } finally {
        setLoading(false)
        setProcessingId(null)
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
      const filteredFeatures = formData.features.filter(f => f.trim() !== '')
      let finalImageUrl = formData.image_url

      if (formData.imageFile) {
        const ext = formData.imageFile.name.split('.').pop()
        const fileName = `${Date.now()}.${ext}`
        const filePath = `service/${fileName}`

        const { error: uploadError } = await supabase
          .storage
          .from('service')
          .upload(filePath, formData.imageFile)

        if (uploadError) throw uploadError

        const { data: publicUrlData } = supabase
          .storage
          .from('service')
          .getPublicUrl(filePath)

        finalImageUrl = publicUrlData.publicUrl
      }

      const { data, error } = await supabase
        .from('services')
        .insert([{
          title: formData.title,
          price: formData.price,
          duration: formData.duration,
          description: formData.description,
          features: filteredFeatures,
          image_url: finalImageUrl
        }])
        .select()

      if (error) throw error

      if (data && data.length > 0) {
        setServices([data[0], ...services])
        await revalidatePaths(['/', '/services'])
        setFormData({
          title: '',
          price: 0,
          duration: '',
          description: '',
          features: [''],
          image_url: '',
          imageFile: null
        })
        setShowForm(false)
      }
    } catch (error: any) {
      console.error('Create error:', error)
      alert('Failed to create service: ' + error.message)
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Services Management</h1>
          <p className="text-gray-400">Manage your spiritual services and offerings</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-faded-gold text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition-colors"
          disabled={loading}
        >
          Add New Service
        </button>
      </div>

      {loading && !showForm ? (
        <div className="flex justify-center py-8">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="grid gap-6">
          {services.map((service) => (
            <div key={service.id} className="bg-gray-800 rounded-lg border border-gray-700 p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-2">
                    <h3 className="text-xl font-semibold text-white">{service.title}</h3>
                    <span className="bg-faded-gold text-black px-3 py-1 rounded-full text-sm font-semibold">
                      £{service.price}
                    </span>
                    <span className="text-gray-400 text-sm">{service.duration}</span>
                  </div>
                  <p className="text-gray-300 mb-4">{service.description}</p>
                  <div>
                    <h4 className="text-sm font-semibold text-faded-gold mb-2">Features:</h4>
                    <div className="flex flex-wrap gap-2">
                      {service.features.map((feature, index) => (
                        <span key={index} className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-sm">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2 ml-4">
                  <button
                    className="text-faded-gold hover:text-yellow-400 px-3 py-1 rounded"
               onClick={() => router.push(`/admin/services/edit/${service.id}`)}

                    disabled={loading}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(service.id)}
                    disabled={loading && processingId === service.id}
                    className={`text-red-400 hover:text-red-300 px-3 py-1 rounded ${loading && processingId === service.id ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {loading && processingId === service.id ? (
                      <span className="flex items-center">
                        <LoadingSpinner className="mr-1 w-3 h-3" />
                        Deleting...
                      </span>
                    ) : (
                      'Delete'
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-white mb-4">Add New Service</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Title*</label>
                <input type="text" name="title" value={formData.title} onChange={handleInputChange} required disabled={loading}
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:border-faded-gold text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Price (£)*</label>
                <input type="number" name="price" value={formData.price} onChange={handleNumberChange} required min="0" step="0.01" disabled={loading}
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:border-faded-gold text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Duration*</label>
                <input type="text" name="duration" value={formData.duration} onChange={handleInputChange} required disabled={loading}
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:border-faded-gold text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Image URL or File*</label>
                <input type="text" name="image_url" value={formData.image_url} onChange={handleInputChange} disabled={loading}
                  className="w-full px-3 py-2 mb-2 bg-gray-900 border border-gray-700 rounded-lg focus:border-faded-gold text-white" placeholder="https://example.com/image.jpg" />
                <input type="file" accept="image/*" onChange={(e) => setFormData(prev => ({ ...prev, imageFile: e.target.files?.[0] || null }))} className="text-white" disabled={loading} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Description*</label>
                <textarea name="description" value={formData.description} onChange={handleInputChange} rows={3} required disabled={loading}
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:border-faded-gold text-white resize-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Features
                  <button type="button" onClick={addFeature} disabled={loading}
                    className="ml-2 text-xs bg-gray-700 text-white px-2 py-1 rounded">+ Add</button>
                </label>
                <div className="space-y-2">
                  {formData.features.map((feature, index) => (
                    <div key={index} className="flex gap-2">
                      <input type="text" value={feature} onChange={(e) => handleFeatureChange(index, e.target.value)} disabled={loading}
                        className="flex-1 px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:border-faded-gold text-white" />
                      {formData.features.length > 1 && (
                        <button type="button" onClick={() => removeFeature(index)} className="text-red-500 hover:text-red-400" disabled={loading}>×</button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex space-x-3">
                <button type="button" onClick={() => setShowForm(false)} disabled={loading}
                  className="flex-1 bg-gray-700 text-white py-2 rounded-lg hover:bg-gray-600 transition-colors">Cancel</button>
                <button type="submit" disabled={loading}
                  className="flex-1 bg-faded-gold text-black py-2 rounded-lg hover:bg-yellow-500 transition-colors flex justify-center items-center">
                  {loading ? (<><LoadingSpinner className="mr-2 w-4 h-4" />Creating...</>) : 'Create Service'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
