'use client';

import { useState } from 'react';
import type { JournalPost } from '@/lib/getJournal';

type Props = {
  posts: JournalPost[];
  showViewAllButton?: boolean;
};

export default function Journal({ posts, showViewAllButton = true }: Props) {
  const [selectedPost, setSelectedPost] = useState<JournalPost | null>(null);

  return (
    <section id="journal" className="py-20 bg-black relative">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-cinzel font-bold text-center text-white mb-12">
          Journal of Mystical Moments
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map(post => (
            <article key={post.id} className="mystical-border rounded-lg overflow-hidden hover-glow transition-all duration-300">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={post.image_url ?? '/placeholder.jpg'}
                  alt={post.title}
                  className="object-cover w-full h-full transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-sm text-gray-300">
                  {new Date(post.created_at).toLocaleDateString()}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-white font-cinzel">
                  {post.title}
                </h3>
                <p className="text-gray-400 mb-6 leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
                <button
                  onClick={() => setSelectedPost(post)}
                  className="text-faded-gold font-medium hover:text-yellow-400 transition-colors"
                >
                  Read More →
                </button>
              </div>
            </article>
          ))}
        </div>

        {showViewAllButton && (
          <div className="text-center mt-12">
            <a href="/journal-section">
              <button className="border-2 border-faded-gold text-faded-gold px-8 py-3 rounded-full font-semibold hover:bg-faded-gold hover:text-black transition-all duration-300">
                View All Stories
              </button>
            </a>
          </div>
        )}
      </div>
{selectedPost && (
  <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex justify-center items-center px-4">
    <div className="bg-[#111] rounded-lg mystical-border w-full max-w-3xl max-h-[90vh] overflow-y-auto relative">

      {/* Close Button */}
      <button
        onClick={() => setSelectedPost(null)}
        className="absolute top-4 right-4 text-faded-gold hover:text-yellow-400 text-xl z-10"
      >
        ✕
      </button>

      {/* Modal Content */}
      <div className="p-6 w-full box-border overflow-hidden">
        <img
          src={selectedPost.image_url ?? '/placeholder.jpg'}
          alt={selectedPost.title}
          className="rounded mb-6 max-h-64 object-cover w-full max-w-full"
        />

        <h2 className="text-2xl font-bold font-cinzel text-white mb-2 break-words">
          {selectedPost.title}
        </h2>
        <p className="text-sm text-gray-400 mb-4">
          {new Date(selectedPost.created_at).toLocaleDateString()}
        </p>

        <div className="text-gray-300 whitespace-pre-line leading-relaxed break-words">
          {selectedPost.content}
        </div>
      </div>
    </div>
  </div>
)}




      
    </section>
  );
}
