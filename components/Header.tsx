'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/90 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="font-cinzel text-2xl font-bold glow-text">
            DeadLive
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="hover:text-faded-gold transition-colors">Home</Link>
            <Link href="/events" className="hover:text-faded-gold transition-colors">Events</Link>
            <Link href="/journal-section" className="hover:text-faded-gold transition-colors">Journal</Link>
            <Link href="/services" className="hover:text-faded-gold transition-colors">Services</Link>
            <Link href="/about" className="hover:text-faded-gold transition-colors">About</Link>
            <Link href="/contact" className="hover:text-faded-gold transition-colors">Contact</Link>
            <Link href="/events">
              <button className="bg-faded-gold text-black px-6 py-2 rounded-full hover-glow font-medium">
                Book Now
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-700">
            <div className="flex flex-col space-y-4 pt-4">
              <Link href="/" className="hover:text-faded-gold transition-colors">Home</Link>
              <Link href="/events" className="hover:text-faded-gold transition-colors">Events</Link>
              <Link href="/journal-section" className="hover:text-faded-gold transition-colors">Journal</Link>
              <Link href="/services" className="hover:text-faded-gold transition-colors">Services</Link>
              <Link href="/about" className="hover:text-faded-gold transition-colors">About</Link>
              <Link href="/contact" className="hover:text-faded-gold transition-colors">Contact</Link>
              <Link href="/events">
                <button className="bg-faded-gold text-black px-6 py-2 rounded-full hover-glow font-medium w-fit">
                  Book Now
                </button>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
