// lib/getReviews.ts

import { createServerSupabaseClient } from './supabase-server'

export async function getReviews() {
  const supabase = createServerSupabaseClient()

  const { data: reviews, error } = await supabase
    .from('reviews')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(6)

  if (error) {
    console.error('Error fetching reviews:', error.message)
    return []
  }

  return reviews.map(review => ({
    id: review.id,
    name: review.name,
    location: review.location,
    quote: review.quote,
    image: review.image_url || '/default-avatar.png',
  }))
}
