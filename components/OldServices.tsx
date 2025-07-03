'use client';

import Image from 'next/image';

const services = [
  {
    id: 1,
    title: "Tarot Reading",
    price: "£35",
    duration: "45 minutes",
    description: "Unlock the mysteries of your future with our experienced tarot readers. Gain insight into love, career, and spiritual guidance.",
    image: "https://images.pexels.com/photos/3088369/pexels-photo-3088369.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
    features: ["Personal guidance", "Future insights", "Spiritual clarity", "Recorded session"]
  },
  {
    id: 2,
    title: "Reiki Healing",
    price: "£55",
    duration: "60 minutes",
    description: "Experience deep relaxation and spiritual healing through the ancient art of Reiki. Balance your energy and find inner peace.",
    image: "https://images.pexels.com/photos/3088369/pexels-photo-3088369.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
    features: ["Energy balancing", "Stress relief", "Chakra alignment", "Healing crystals"]
  },
  {
    id: 3,
    title: "Numerology Reading",
    price: "£40",
    duration: "50 minutes",
    description: "Discover the hidden meanings in numbers and how they influence your life path, personality, and destiny.",
    image: "https://images.pexels.com/photos/3088369/pexels-photo-3088369.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
    features: ["Life path analysis", "Personality insights", "Compatibility reading", "Written report"]
  }
];

export default function Services() {
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
          {services.map((service) => (
            <div key={service.id} className="mystical-border rounded-lg overflow-hidden hover-glow transition-all duration-300">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute top-4 right-4 bg-faded-gold text-black px-3 py-1 rounded-full text-sm font-semibold">
                  {service.price}
                </div>
                <div className="absolute bottom-4 left-4">
                  <h3 className="font-cinzel text-xl font-semibold text-white">{service.title}</h3>
                  <p className="text-gray-300 text-sm">{service.duration}</p>
                </div>
              </div>
              
              <div className="p-6">
                <p className="text-gray-300 mb-6 leading-relaxed">
                  {service.description}
                </p>
                
                <div className="mb-6">
                  <h4 className="font-semibold mb-3 text-faded-gold">What&apos;s Included:</h4>
                  <ul className="space-y-2">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-gray-400">
                        <svg className="w-4 h-4 text-faded-gold" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <button className="w-full bg-faded-gold text-black py-3 rounded-full font-semibold hover:bg-yellow-500 transition-colors">
                  Book Session
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
