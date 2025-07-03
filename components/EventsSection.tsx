'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Event {
  id: string
  title: string
  location: string
  date: string
  price: number
  category: string
  description: string
  image_url: string
}

interface EventsProps {
  events: Event[]
}

export default function EventsSection({ events = [] }: EventsProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  
  // Fixed: Using Array.from to safely convert Set to array
  const uniqueCategories = events.length > 0
    ? Array.from(new Set(events.map(event => event.category)))
    : [];
  
  const categories = ["All", ...uniqueCategories];

  const filteredEvents = activeCategory === "All"
    ? events
    : events.filter(event => event.category === activeCategory);

  return (
    <section id="events" className="py-20 bg-haunted-gradient">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-cinzel text-4xl md:text-5xl font-bold mb-6 glow-text">
            Upcoming Events
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Join us for spine-chilling investigations and spiritual experiences across the UK
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-faded-gold text-black'
                  : 'border border-faded-gold text-faded-gold hover:bg-faded-gold hover:text-black'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event) => (
            <div key={event.id} className="mystical-border rounded-lg overflow-hidden hover-glow transition-all duration-300">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={event.image_url || "https://images.pexels.com/photos/1666021/pexels-photo-1666021.jpeg"}
                  alt={event.title}
              
                  className="object-cover transition-transform duration-300 hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute top-4 right-4 bg-faded-gold text-black px-3 py-1 rounded-full text-sm font-semibold">
                  £{event.price}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-faded-gold text-sm">{event.category}</span>
                </div>
                <h3 className="font-cinzel text-xl font-semibold mb-2">{event.title}</h3>
                <p className="text-gray-400 text-sm mb-2">{event.location}</p>
                <p className="text-gray-400 text-sm mb-4">
                  {new Date(event.date).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </p>
                <p className="text-gray-300 mb-6">{event.description}</p>
                <button
  onClick={async () => {
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        price: event.price,
        name: event.title,
        eventId: event.id,
      }),
    });

    const data = await res.json();
    if (data?.url) {
      window.location.href = data.url;
    } else {
      alert('Something went wrong with checkout.');
    }
  }}
  className="w-full bg-faded-gold text-black py-3 rounded-full font-semibold hover:bg-yellow-500 transition-colors text-center"
>
  Book Now
</button>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}