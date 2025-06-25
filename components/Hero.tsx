export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/2166711/pexels-photo-2166711.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')`
        }}
      >
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="absolute inset-0 fog-effect"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-4 h-4 bg-faded-gold rounded-full ghost-fade"></div>
      <div className="absolute top-40 right-20 w-3 h-3 bg-faded-gold rounded-full ghost-fade" style={{animationDelay: '1s'}}></div>
      <div className="absolute bottom-40 left-20 w-2 h-2 bg-faded-gold rounded-full ghost-fade" style={{animationDelay: '2s'}}></div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <h1 className="font-cinzel text-5xl md:text-7xl font-bold mb-6 glow-text leading-tight">
          Experience Real Ghost Hunts Across the UK
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-2xl mx-auto leading-relaxed">
          Join our team of paranormal experts on thrilling overnight investigations in the UK&aposs most haunted locations.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-faded-gold text-black px-8 py-4 rounded-full text-lg font-semibold hover-glow transition-all duration-300">
            Book an Event
          </button>
          <button className="border-2 border-faded-gold text-faded-gold px-8 py-4 rounded-full text-lg font-semibold hover:bg-faded-gold hover:text-black transition-all duration-300">
            Watch Our Story
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-faded-gold ghost-fade">
        <svg className="w-6 h-6 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
        <p className="text-sm">Scroll to explore</p>
      </div>
    </section>
  );
}