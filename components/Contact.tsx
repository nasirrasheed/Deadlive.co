'use client';

import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import type { Database } from '@/lib/supabase'; // adjust this if your types file is named differently

export default function ContactPage() {
  const supabase = createClientComponentClient<Database>();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setError('');
  setSuccess(false);

  try {
    const response = await fetch('/api/contactSubmit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Unknown error');
    }

    setSuccess(true);
    setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' });
  } catch (err: any) {
    setError(err.message || 'Something went wrong. Please try again.');
  } finally {
    setLoading(false);
  }
};

  return (
    <section className="py-20 bg-black text-white">
      <div className="container mx-auto px-6 max-w-4xl">
        <h2 className="font-cinzel text-4xl md:text-5xl font-bold mb-6 glow-text">
          Contact the Other Side
        </h2>

        <p className="text-xl text-gray-300 mb-8">
          Ready to embark on a paranormal adventure? Send us a message.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6 bg-gray-900 p-8 rounded-lg mystical-border">
          <div>
            <label htmlFor="name" className="block mb-2">Name</label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg focus:border-faded-gold focus:outline-none"
              placeholder="Your full name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block mb-2">Email</label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg focus:border-faded-gold focus:outline-none"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="subject" className="block mb-2">Subject</label>
            <select
              id="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg focus:border-faded-gold focus:outline-none"
            >
              <option>General Inquiry</option>
              <option>Book an Event</option>
              <option>Spiritual Services</option>
              <option>Private Investigation</option>
              <option>Media & Press</option>
            </select>
          </div>

          <div>
            <label htmlFor="message" className="block mb-2">Message</label>
            <textarea
              id="message"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg focus:border-faded-gold focus:outline-none"
              placeholder="Share your thoughts with the beyond..."
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-faded-gold text-black w-full py-3 rounded-full font-semibold hover-glow transition-all duration-300"
          >
            {loading ? 'Sending...' : 'Send Message'}
          </button>

          {success && <p className="text-green-500 mt-4">Message sent successfully!</p>}
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </form>
      </div>
    </section>
  );
}