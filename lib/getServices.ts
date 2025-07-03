import { createServerSupabaseClient } from './supabase-server';

export async function getServices() {
  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase.from('services').select('*');

  if (error) {
    console.error('❌ Error fetching services:', error.message);
    return [];
  }

  return data?.map(service => ({
    id: service.id,
    title: service.name, // name in DB = title in UI
    description: service.description,
    price: service.price,
    duration: service.duration ?? '',
    features: service.features ?? [],
    image_url: service.image_url,
    category: service.category,
  })) || [];
}
