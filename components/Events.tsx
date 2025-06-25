'use client';

import { useState } from 'react';
import Image from 'next/image';

const events = [
  {
    id: 1,
    title: "Pendle Hill Witch Hunt",
    location: "Lancashire, UK",
    date: "March 15, 2024",
    price: "£45",
    category: "Ghost Hunts",
    image: "https://images.pexels.com/photos/1666021/pexels-photo-1666021.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
    description: "Explore the infamous Pendle Hill where the witch trials took place in 1612."
  },
  {
    id: 2,
    title: "Tower of London Investigation",
    location: "London, UK",
    date: "March 22, 2024",
    price: "£65",
    category: "Ghost Hunts",
    image: "https://images.pexels.com/photos/1796730/pexels-photo-1796730.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
    description: "Investigate one of England's most haunted fortresses after dark."
  },
  {
    id: 3,
    title: "Psychic Evening with Sarah",
    location: "Manchester, UK",
    date: "March 28, 2024",
    price: "£35",
    category: "Psychic Nights",
    image: "https://images.pexels.com/photos/3088369/pexels-photo-3088369.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
    description: "Connect with the spirit world through our renowned psychic medium."
  },
  {
    id: 4,
    title: "Edinburgh Castle Ghost Walk",
    location: "Edinburgh, Scotland",
    date: "April 5, 2024",
    price: "£55",
    category: "Ghost Hunts",
    image: "https://images.pexels.com/photos/2166711/pexels-photo-2166711.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
    description: "Uncover the dark secrets of Scotland's most haunted castle."
  },
  {
    id: 5,
    title: "Private Group Investigation",
    location: "Various Locations",
    date: "Available on Request",
    price: "£300",
    category: "Private Events",
    image: "https://images.pexels.com/photos/1666021/pexels-photo-1666021.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
    description: "Book an exclusive paranormal investigation for your group."
  },
  {
    id: 6,
    title: "Séance Circle Experience",
    location: "Birmingham, UK",
    date: "April 12, 2024",
    price: "£40",
    category: "Psychic Nights",
    image: "https://images.pexels.com/photos/3088369/pexels-photo-3088369.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
    description: "Join our intimate séance circle to communicate with spirits."
  }
];

const categories = ["All", "Ghost Hunts", "Psychic Nights", "Private Events"];

export default function Events() {
  const [activeCategory, setActiveCategory] = useState("All");

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
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={event.id === 1}
                />
                <div className="absolute top-4 right-4 bg-faded-gold text-black px-3 py-1 rounded-full text-sm font-semibold">
                  {event.price}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-faded-gold text-sm">{event.category}</span>
                </div>
                <h3 className="font-cinzel text-xl font-semibold mb-2">{event.title}</h3>
                <p className="text-gray-400 text-sm mb-2">{event.location}</p>
                <p className="text-gray-400 text-sm mb-4">{event.date}</p>
                <p className="text-gray-300 mb-6">{event.description}</p>
                <button className="w-full bg-faded-gold text-black py-3 rounded-full font-semibold hover:bg-yellow-500 transition-colors">
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
