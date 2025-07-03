'use client';

import Image from 'next/image';
import Link from 'next/link';

interface JournalPost {
  id: string
  title: string
  excerpt: string
  slug: string
  created_at: string
  image_url: string
}

interface JournalListProps {
  posts: JournalPost[]
}

export default function JournalList({ posts }: JournalListProps) {
  return (
    <section id="journal" className="py-20 bg-haunted-gradient">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-cinzel text-4xl md:text-5xl font-bold mb-6 glow-text">
            Paranormal Journal
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Explore our collection of ghostly encounters and supernatural investigations
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div key={post.id} className="mystical-border rounded-lg overflow-hidden hover-glow transition-all duration-300">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={post.image_url || "https://images.pexels.com/photos/1666021/pexels-photo-1666021.jpeg"}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-6">
                <h3 className="font-cinzel text-xl font-semibold mb-2">{post.title}</h3>
                <p className="text-gray-400 text-sm mb-4">
                  {new Date(post.created_at).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </p>
                <p className="text-gray-300 mb-6">{post.excerpt}</p>
                <Link 
                  href={`/journal/${post.slug}`} 
                  className="text-faded-gold hover:underline font-semibold"
                >
                  Read Full Story
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}