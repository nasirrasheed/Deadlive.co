'use client'

import { useState } from 'react'
import LoadingSpinner from '@/components/admin/LoadingSpinner'

interface Review {
  id: string
  name: string
  location: string
  quote: string
  rating: number
  approved: boolean
  createdAt: string
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: '1',
      name: 'Sarah Mitchell',
      location: 'Manchester, UK',
      quote: 'The most incredible experience of my life! The team at DeadLive made me feel safe while exploring the unknown.',
      rating: 5,
      approved: true,
      createdAt: '2024-02-28'
    },
    {
      id: '2',
      name: 'James Thompson',
      location: 'London, UK',
      quote: 'Professional, respectful, and absolutely thrilling. The psychic reading session gave me closure I\'d been seeking for years.',
      rating: 5,
      approved: true,
      createdAt: '2024-02-25'
    },
    {
      id: '3',
      name: 'Emma Roberts',
      location: 'Birmingham, UK',
      quote: 'I was skeptical at first, but the evidence we captured during our investigation was undeniable.',
      rating: 4,
      approved: false,
      createdAt: '2024-02-20'
    }
  ])
  const [loading, setLoading] = useState(false)
  const [processingId, setProcessingId] = useState<string | null>(null)

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this review?')) {
      setProcessingId(id)
      setLoading(true)
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500))
        setReviews(reviews.filter(review => review.id !== id))
      } finally {
        setLoading(false)
        setProcessingId(null)
      }
    }
  }

  const toggleApproved = async (id: string) => {
    setProcessingId(id)
    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      setReviews(reviews.map(review => 
        review.id === id ? { ...review, approved: !review.approved } : review
      ))
    } finally {
      setLoading(false)
      setProcessingId(null)
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`text-lg ${i < rating ? 'text-yellow-400' : 'text-gray-600'}`}>
        ★
      </span>
    ))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Reviews Management</h1>
          <p className="text-gray-400">Manage customer reviews and testimonials</p>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-400">
            {reviews.filter(r => !r.approved).length} pending approval
          </span>
        </div>
      </div>

      <div className="grid gap-6">
        {reviews.map((review) => (
          <div key={review.id} className={`bg-gray-800 rounded-lg border p-6 ${
            review.approved ? 'border-gray-700' : 'border-yellow-600'
          }`}>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-2">
                  <h3 className="text-lg font-semibold text-white">{review.name}</h3>
                  <span className="text-gray-400 text-sm">{review.location}</span>
                  <div className="flex">{renderStars(review.rating)}</div>
                </div>
                <p className="text-gray-300 mb-4 italic">&quot;{review.quote}&quot;</p>
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <span>Submitted: {review.createdAt}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    review.approved 
                      ? 'bg-green-900 text-green-200' 
                      : 'bg-yellow-900 text-yellow-200'
                  }`}>
                    {review.approved ? 'Approved' : 'Pending'}
                  </span>
                </div>
              </div>
              <div className="flex flex-col space-y-2 ml-4">
                <button
                  onClick={() => toggleApproved(review.id)}
                  disabled={loading && processingId === review.id}
                  className={`px-3 py-1 rounded text-sm font-semibold ${
                    review.approved
                      ? 'bg-yellow-600 text-white hover:bg-yellow-700'
                      : 'bg-green-600 text-white hover:bg-green-700'
                  } ${loading && processingId === review.id ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {loading && processingId === review.id ? (
                    <span className="flex items-center">
                      <LoadingSpinner className="mr-1 w-3 h-3" />
                      Processing...
                    </span>
                  ) : review.approved ? (
                    'Unapprove'
                  ) : (
                    'Approve'
                  )}
                </button>
                <button 
                  onClick={() => handleDelete(review.id)}
                  disabled={loading && processingId === review.id}
                  className={`px-3 py-1 rounded text-sm font-semibold bg-red-600 text-white hover:bg-red-700 ${
                    loading && processingId === review.id ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {loading && processingId === review.id ? (
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
    </div>
  )
}