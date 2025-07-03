// lib/getJournal.ts
import { createServerSupabaseClient } from './supabase-server';

export type JournalPost = {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image_url: string | null;
  created_at: string;
};

export async function getJournalPosts(limit?: number): Promise<JournalPost[]> {
  const supabase = createServerSupabaseClient();

  let query = supabase
    .from('blog_posts')
    .select('id, title, excerpt, content, image_url, created_at')
    .eq('published', true)
    .order('created_at', { ascending: false });

  if (limit) query = query.limit(limit);

  const { data, error } = await query;

  if (error) {
    console.error('❌ Error fetching blog posts:', error.message);
    return [];
  }

  return data ?? [];
}
