// app/events-section/page.tsx
import EventsSection from '@/components/EventsSection';
import { createServerSupabaseClient } from '@/lib/supabase-server';

export default async function EventsPage() {
  const supabase = createServerSupabaseClient();

  const { data: eventsData } = await supabase.from('events').select('*');

  const events = eventsData?.map(event => ({
    id: event.id,
    title: event.title,
    location: event.location,
    date: event.date,
    price: event.price,
    category: event.category,
    description: event.description,
    image_url: event.image_url,
  })) ?? [];

  if (!events.length) {
    return (
      <div className="text-center text-red-500 py-20">
        Failed to load Events
      </div>
    );
  }

  return <EventsSection events={events} showAllButton={false} />;
}
