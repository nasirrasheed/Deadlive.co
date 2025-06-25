'use client';

import Image from 'next/image';

const testimonials = [
  {
    id: 1,
    quote: "The most incredible experience of my life! The team at DeadLive made me feel safe while exploring the unknown. I'll never forget the voices we heard in the old chapel.",
    name: "Sarah Mitchell",
    location: "Manchester, UK",
    image: "https://images.pexels.com/photos/3088369/pexels-photo-3088369.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
  },
  {
    id: 2,
    quote: "Professional, respectful, and absolutely thrilling. The psychic reading session gave me closure I'd been seeking for years. Highly recommend DeadLive to anyone curious about the paranormal.",
    name: "James Thompson",
    location: "London, UK",
    image: "https://images.pexels.com/photos/3088369/pexels-photo-3088369.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
  },
  {
    id: 3,
    quote: "I was skeptical at first, but the evidence we captured during our investigation was undeniable. The team's expertise and genuine passion for the paranormal really shows.",
    name: "Emma Roberts",
    location: "Birmingham, UK",
    image: "https://images.pexels.com/photos/3088369/pexels-photo-3088369.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
  },
  {
    id: 4,
    quote: "An unforgettable night at Edinburgh Castle! The historical context combined with the paranormal investigation made for an educational and spine-tingling experience.",
    name: "David Wilson",
    location: "Edinburgh, Scotland",
    image: "https://images.pexels.com/photos/3088369/pexels-photo-3088369.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
  }
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-haunted-gradient">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-cinzel text-4xl md:text-5xl font-bold mb-6 glow-text">
            What Our Guests Say
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Real experiences from brave souls who&apos;ve joined us on our paranormal journeys
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="mystical-border rounded-lg p-8 hover-glow transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={64}
                    height={64}
                    className="rounded-full object-cover border-2 border-faded-gold"
                  />
                </div>
                <div className="flex-1">
                  <div className="mb-4">
                    <svg className="w-8 h-8 text-faded-gold mb-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                    <p className="text-gray-300 leading-relaxed italic">
                      &quot;{testimonial.quote}&quot;
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-white">{testimonial.name}</p>
                    <p className="text-sm text-gray-400">{testimonial.location}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="flex items-center justify-center gap-2 text-faded-gold">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-lg font-semibold">4.9/5 from 500+ reviews</span>
          </div>
        </div>
      </div>
    </section>
  );
}
