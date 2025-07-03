import { supabase } from '@/lib/supabase'
import JournalPost from '@/components/JournalPost'

export const revalidate = 3600

async function getPost(slug: string) {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single()

  if (error) {
    console.error('Error fetching journal post:', error);
    return null;
  }
  return data;
}

export default async function JournalPostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);
  
  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl text-white">Journal post not found</h1>
      </div>
    )
  }
  
  return <JournalPost post={post} />
}