'use client';

import Image from 'next/image';

export default function About() {
  const stats = [
    { number: '5,000+', label: 'Event Attendees' },
    { number: '10', label: 'Years Experience' },
    { number: '150+', label: 'Locations Investigated' },
    { number: '50+', label: 'Paranormal Experts' }
  ];

  return (
    <section id="about" className="py-20 bg-black">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-cinzel text-4xl md:text-5xl font-bold mb-6 glow-text">
              About DeadLive
            </h2>
            <div className="space-y-6 text-gray-300 leading-relaxed">
              <p className="text-lg">
                For over a decade, DeadLive has been at the forefront of paranormal investigation in the UK. 
                We are a team of dedicated researchers, psychic mediums, and spiritual guides who share a 
                passion for exploring the mysteries that lie beyond the veil.
              </p>
              <p>
                Our mission is to provide authentic, respectful, and thrilling encounters with the paranormal 
                while maintaining the highest standards of safety and professionalism. We believe that the 
                spirit world has stories to tell, and we&apos;re here to listen.
              </p>
              <p>
                From historic castles to abandoned asylums, we investigate the UK&apos;s most haunted locations 
                using state-of-the-art equipment and time-tested spiritual practices. Every investigation 
                is an opportunity to bridge the gap between our world and the next.
              </p>
            </div>

            <div className="mt-8">
              <button className="bg-faded-gold text-black px-8 py-3 rounded-full font-semibold hover-glow transition-all duration-300">
                Join Our Team
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="relative h-96 rounded-lg overflow-hidden mystical-border">
            <div className="relative w-full h-full rounded-lg"> {/* Add this wrapper div */}
  <Image 
    src="https://images.pexels.com/photos/1666021/pexels-photo-1666021.jpeg"
    alt="DeadLive team investigation"
    fill
    style={{ objectFit: 'cover' }}
    className="rounded-lg"
    priority
    sizes="(max-width: 768px) 100vw, 100vw"
  />
</div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>

            {/* Floating stats */}
            <div className="absolute -bottom-8 -left-8 bg-deep-purple/90 backdrop-blur-sm p-4 rounded-lg mystical-border">
              <div className="text-center">
                <div className="text-2xl font-bold text-faded-gold">10+</div>
                <div className="text-sm text-gray-300">Years</div>
              </div>
            </div>

            <div className="absolute -top-8 -right-8 bg-deep-purple/90 backdrop-blur-sm p-4 rounded-lg mystical-border">
              <div className="text-center">
                <div className="text-2xl font-bold text-faded-gold">5K+</div>
                <div className="text-sm text-gray-300">Attendees</div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-faded-gold mb-2 font-cinzel">
                {stat.number}
              </div>
              <div className="text-gray-400 text-sm uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
