import { supabase } from '@/lib/supabase'
import JournalList from '@/components/JournalList'

export const revalidate = 3600

async function getPosts() {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('id, title, excerpt, slug, created_at, image')
    .eq('published', true)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching journal posts:', error);
    return [];
  }
  return data || [];
}

export default async function JournalPage() {
  const posts = await getPosts();
  return <JournalList posts={posts} />
}