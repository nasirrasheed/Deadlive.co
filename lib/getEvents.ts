import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export async function getEvents() {
  const supabase = createServerComponentClient({ cookies })

  const { data, error } = await supabase.from('events').select('*').order('date', { ascending: true })

  if (error) {
    console.error('Error fetching events:', error.message)
    return []
  }

  return data
}
