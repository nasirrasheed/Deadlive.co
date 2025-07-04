// app/page.tsx
import Hero from '@/components/Hero';
import Journal from '@/components/Journal';
import About from '@/components/About';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import EventsSection from '@/components/EventsSection';
import ServicesSection from '@/components/ServicesSection';

import { createServerSupabaseClient } from '@/lib/supabase-server';
import { getServices } from '@/lib/getServices';
import { getJournalPosts } from '@/lib/getJournal';
import { getReviews } from '@/lib/getReviews';

export default async function Home() {
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

  const services     = await getServices();
  const journalPosts = await getJournalPosts(3); // Show only 3
  const testimonials = await getReviews();

  return (
    <div className="scroll-smooth">
      <Hero />
      <EventsSection events={events} showAllButton={true} />
      <ServicesSection services={services} limit={6} showAllButton={true} />
      <Journal posts={journalPosts} showViewAllButton={true} />
      <About />
      <Testimonials testimonials={testimonials} />
      <Contact />
    </div>
  );
}
