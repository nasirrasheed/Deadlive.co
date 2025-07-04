'use client';

import Image from 'next/image';
import Link from 'next/link';

interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  features: string[];
  image_url: string;
  category: string;
}

interface ServicesProps {
  services: Service[];
  showAllButton?: boolean; // Controls visibility of "View All Services" button
  limit?: number; // Optional limit for how many services to show
}

export default function ServicesSection({ services, showAllButton = true, limit }: ServicesProps) {
  const displayedServices = limit ? services.slice(0, limit) : services;

  return (
    <section id="services" className="py-20 bg-haunted-gradient">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-cinzel text-4xl md:text-5xl font-bold mb-6 glow-text">
            Spiritual Services
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Connect with your spiritual side through our range of mystical services and healing practices
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedServices.map((service) => (
            <div key={service.id} className="mystical-border rounded-lg overflow-hidden hover-glow transition-all duration-300">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={service.image_url || "https://images.pexels.com/photos/3088369/pexels-photo-3088369.jpeg"}
                  alt={service.title}
                  className="object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute top-4 right-4 bg-faded-gold text-black px-3 py-1 rounded-full text-sm font-semibold">
                  £{service.price}
                </div>
                <div className="absolute bottom-4 left-4">
                  <h3 className="font-cinzel text-xl font-semibold text-white">{service.title}</h3>
                  <p className="text-gray-300 text-sm">{service.duration}</p>
                </div>
              </div>

              <div className="p-6">
                <p className="text-gray-300 mb-6 leading-relaxed">{service.description}</p>

                <div className="mb-6">
                  <h4 className="font-semibold mb-3 text-faded-gold">What's Included:</h4>
                  <ul className="space-y-2">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-gray-400">
                        <svg className="w-4 h-4 text-faded-gold" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={async () => {
                    const res = await fetch('/api/checkout', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                        price: service.price,
                        name: service.title,
                        serviceId: service.id,
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
                  Book Session
                </button>
              </div>
            </div>
          ))}
        </div>

        {showAllButton && (
          <div className="mt-12 text-center">
            <Link href="/services-section">
              <span className="inline-block bg-faded-gold text-black px-6 py-3 rounded-full font-semibold hover:bg-yellow-500 transition-colors cursor-pointer">
                View All Services
              </span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
