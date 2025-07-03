// app/JournalSection/page.tsx
import Journal from '@/components/Journal';
import { getJournalPosts } from '@/lib/getJournal';

export default async function JournalSectionPage() {
  const posts = await getJournalPosts(); // All posts

  if (!posts.length) {
    return (
      <div className="text-center text-red-500 py-20">
        Failed to load blog posts
      </div>
    );
  }

  return <Journal posts={posts} showViewAllButton={false} />;
}
