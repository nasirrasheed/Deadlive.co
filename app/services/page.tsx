import { supabase } from '@/lib/supabase'
import ServicesSection from '@/components/ServicesSection' // Updated import

export const revalidate = 3600

async function getServices() {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching services:', error)
    throw new Error('Failed to fetch services')
  }
  return data
}

export default async function ServicesPage() {
  const services = await getServices()
  return <ServicesSection services={services} /> // Fixed component name
}