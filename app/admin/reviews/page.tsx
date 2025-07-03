'use client'

import { useState, useEffect, ChangeEvent } from 'react'
import { createClient } from '@/lib/client'
import LoadingSpinner from '@/components/admin/LoadingSpinner'
import { v4 as uuidv4 } from 'uuid'

interface Review {
  id: string
  name: string
  location: string
  quote: string
  rating: number
  image_url: string | null
  created_at: string
}

export default function ReviewsPage() {
  const supabase = createClient()
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const [form, setForm] = useState({
    name: '',
    location: '',
    quote: '',
    rating: 5,
    image_url: '',
  })

  const [editingId, setEditingId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState({
    name: '',
    location: '',
    quote: '',
    rating: 5,
  })

  useEffect(() => {
    const fetchReviews = async () => {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching reviews:', error.message)
      } else if (data) {
        setReviews(data)
      }

      setLoading(false)
    }

    fetchReviews()
  }, [supabase])

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) setImageFile(file)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    let imageUrl: string | null = null

    try {
      if (imageFile) {
        const ext = imageFile.name.split('.').pop()
        const filename = `review-${uuidv4()}.${ext}`
        const filePath = `avatars/${filename}`

        const { error: uploadError } = await supabase.storage
          .from('review-images')
          .upload(filePath, imageFile, {
            cacheControl: '3600',
            upsert: false,
          })

        if (uploadError) throw uploadError

        const { data: publicUrlData } = supabase.storage
          .from('review-images')
          .getPublicUrl(filePath)

        imageUrl = publicUrlData?.publicUrl ?? null
      } else if (form.image_url.trim() !== '') {
        imageUrl = form.image_url.trim()
      }

      const { data, error } = await supabase.from('reviews').insert([{
        name: form.name,
        location: form.location,
        quote: form.quote,
        rating: form.rating,
        image_url: imageUrl,
      }]).select()

      if (error) throw error

      if (data && data.length > 0) {
        setReviews([data[0], ...reviews])
        setForm({ name: '', location: '', quote: '', rating: 5, image_url: '' })
        setImageFile(null)
      }
    } catch (err: any) {
      alert('Error: ' + err.message)
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this review?')) return
    const { error } = await supabase.from('reviews').delete().eq('id', id)
    if (!error) {
      setReviews(reviews.filter(r => r.id !== id))
    } else {
      alert('Failed to delete review.')
    }
  }

  const startEditing = (review: Review) => {
    setEditingId(review.id)
    setEditForm({
      name: review.name,
      location: review.location,
      quote: review.quote,
      rating: review.rating,
    })
  }

  const handleUpdate = async (e: React.FormEvent, id: string) => {
    e.preventDefault()

    const { error } = await supabase
      .from('reviews')
      .update(editForm)
      .eq('id', id)

    if (!error) {
      setReviews(reviews.map(r => (r.id === id ? { ...r, ...editForm } : r)))
      setEditingId(null)
    } else {
      alert('Failed to update review.')
    }
  }

  const renderStars = (rating: number) =>
    Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`text-lg ${i < rating ? 'text-yellow-400' : 'text-gray-600'}`}>★</span>
    ))

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-white">Add a Review</h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <input
            className="p-2 rounded bg-gray-800 text-white"
            placeholder="Name"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            className="p-2 rounded bg-gray-800 text-white"
            placeholder="Location"
            value={form.location}
            onChange={e => setForm({ ...form, location: e.target.value })}
            required
          />
          <textarea
            className="p-2 rounded bg-gray-800 text-white col-span-full"
            placeholder="Quote"
            value={form.quote}
            onChange={e => setForm({ ...form, quote: e.target.value })}
            required
          />
          <input
            className="p-2 rounded bg-gray-800 text-white"
            type="number"
            min={1}
            max={5}
            value={form.rating}
            onChange={e => setForm({ ...form, rating: parseInt(e.target.value) })}
            required
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="text-white"
          />
          <input
            className="p-2 rounded bg-gray-800 text-white col-span-full"
            placeholder="Image URL (optional)"
            value={form.image_url}
            onChange={e => setForm({ ...form, image_url: e.target.value })}
          />
          <button
            type="submit"
            className="p-2 bg-faded-gold text-black rounded font-semibold hover:bg-yellow-400 transition-colors"
            disabled={submitting}
          >
            {submitting ? 'Submitting...' : 'Add Review'}
          </button>
        </form>
      </div>

      <div>
        <h2 className="text-xl font-bold text-white">Submitted Reviews</h2>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="grid gap-6 mt-6">
            {reviews.map((review) => {
              const isEditing = editingId === review.id

              return (
                <div key={review.id} className="bg-gray-800 rounded-lg border border-gray-700 p-6">
                  <div className="flex justify-between items-start">
                    <div className="w-full">
                      {isEditing ? (
                        <form
                          onSubmit={e => handleUpdate(e, review.id)}
                          className="space-y-2"
                        >
                          <input
                            className="p-2 w-full rounded bg-gray-700 text-white"
                            value={editForm.name}
                            onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                          />
                          <input
                            className="p-2 w-full rounded bg-gray-700 text-white"
                            value={editForm.location}
                            onChange={e => setEditForm({ ...editForm, location: e.target.value })}
                          />
                          <textarea
                            className="p-2 w-full rounded bg-gray-700 text-white"
                            value={editForm.quote}
                            onChange={e => setEditForm({ ...editForm, quote: e.target.value })}
                          />
                          <input
                            className="p-2 w-full rounded bg-gray-700 text-white"
                            type="number"
                            min={1}
                            max={5}
                            value={editForm.rating}
                            onChange={e => setEditForm({ ...editForm, rating: parseInt(e.target.value) })}
                          />
                          <div className="flex gap-2">
                            <button type="submit" className="bg-green-600 px-3 py-1 rounded">Save</button>
                            <button type="button" className="bg-gray-600 px-3 py-1 rounded" onClick={() => setEditingId(null)}>Cancel</button>
                          </div>
                        </form>
                      ) : (
                        <>
                          <h3 className="text-lg font-semibold text-white">{review.name}</h3>
                          <p className="text-gray-400 text-sm">{review.location}</p>
                          {review.image_url && (
                            <img
                              src={review.image_url}
                              alt="Reviewer"
                              className="mt-2 w-24 h-24 object-cover rounded-full border border-gray-600"
                            />
                          )}
                          <div className="flex mt-2">{renderStars(review.rating)}</div>
                          <p className="text-gray-300 mt-2 italic">“{review.quote}”</p>
                          <p className="text-xs text-gray-500 mt-2">
                            Created: {new Date(review.created_at).toLocaleDateString()}
                          </p>
                          <div className="mt-2 flex gap-4 text-sm">
                            <button onClick={() => startEditing(review)} className="text-blue-400 hover:underline">Edit</button>
                            <button onClick={() => handleDelete(review.id)} className="text-red-500 hover:underline">Delete</button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
