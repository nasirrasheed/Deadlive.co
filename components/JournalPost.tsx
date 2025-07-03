'use client';

import Image from 'next/image';

interface JournalPost {
  id: string
  title: string
  content: string
  created_at: string
  image_url: string
}

interface JournalPostProps {
  post: JournalPost
}

export default function JournalPost({ post }: JournalPostProps) {
  return (
    <article className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="font-cinzel text-4xl md:text-5xl font-bold mb-6 glow-text text-center">
        {post.title}
      </h1>
      
      <p className="text-gray-400 text-center mb-8">
        {new Date(post.created_at).toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        })}
      </p>
      
      <div className="relative h-96 rounded-lg overflow-hidden mb-12">
        <Image
          src={post.image_url || "https://images.pexels.com/photos/1666021/pexels-photo-1666021.jpeg"}
          alt={post.title}
          fill
          className="object-cover"
        />
      </div>
      
      <div 
        className="prose prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }} 
      />
      
      <div className="mt-12 text-center">
        <a 
          href="/journal" 
          className="text-faded-gold hover:underline inline-block px-6 py-3 border border-faded-gold rounded-full"
        >
          &larr; Back to Journal
        </a>
      </div>
    </article>
  );
}