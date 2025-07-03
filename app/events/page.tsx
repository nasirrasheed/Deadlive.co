import { supabase } from '@/lib/supabase'
import EventsSection from '@/components/EventsSection' // Updated import

export const revalidate = 3600

async function getEvents() {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .order('date', { ascending: true })

  if (error) {
    console.error('Error fetching events:', error)
    throw new Error('Failed to fetch events')
  }
  return data
}

export default async function EventsPage() {
  const events = await getEvents()
  return <EventsSection events={events} /> // Fixed component name
}