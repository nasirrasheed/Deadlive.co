'use client';

import Image from 'next/image';

const articles = [
  {
    id: 1,
    title: "The Haunting of Borley Rectory",
    excerpt: "Discover the chilling tale of England's most haunted house and our recent investigation that uncovered new evidence of paranormal activity.",
    image: "https://images.pexels.com/photos/1666021/pexels-photo-1666021.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
    date: "February 28, 2024",
    readTime: "8 min read"
  },
  {
    id: 2,
    title: "Voices from the Tower: Our London Investigation",
    excerpt: "An exclusive look into our overnight investigation at the Tower of London, where we captured unexplained voices and mysterious apparitions.",
    image: "https://images.pexels.com/photos/1796730/pexels-photo-1796730.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
    date: "February 15, 2024",
    readTime: "12 min read"
  },
  {
    id: 3,
    title: "Understanding EVP: Electronic Voice Phenomena",
    excerpt: "Learn about the science behind EVP recordings and how our team uses cutting-edge technology to communicate with the spirit world.",
    image: "https://images.pexels.com/photos/3088369/pexels-photo-3088369.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
    date: "February 8, 2024",
    readTime: "6 min read"
  }
];

export default function Journal() {
  return (
    <section id="journal" className="py-20 bg-black">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-cinzel text-4xl md:text-5xl font-bold mb-6 glow-text">
            Haunted Journal
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Real stories from our paranormal investigations and encounters with the supernatural
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <article key={article.id} className="mystical-border rounded-lg overflow-hidden hover-glow transition-all duration-300">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-300 hover:scale-110"
                  priority={article.id === 1}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-sm text-gray-300">
                  {article.date} • {article.readTime}
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-cinzel text-xl font-semibold mb-3 hover:text-faded-gold transition-colors">
                  {article.title}
                </h3>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  {article.excerpt}
                </p>
                <button className="text-faded-gold font-medium hover:text-yellow-400 transition-colors flex items-center gap-2">
                  Read More
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="border-2 border-faded-gold text-faded-gold px-8 py-3 rounded-full font-semibold hover:bg-faded-gold hover:text-black transition-all duration-300">
            View All Stories
          </button>
        </div>
      </div>
    </section>
  );
}
