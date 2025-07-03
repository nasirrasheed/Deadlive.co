'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import LoadingSpinner from '@/components/admin/LoadingSpinner'

interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  published: boolean
  created_at: string
  slug: string
  image_url: string
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    slug: '',
    published: false,
    imageURL: '',
    imageFile: null as File | null,
  })
  const router = useRouter()

  useEffect(() => { fetchPosts() }, [])

  async function fetchPosts() {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) console.error(error)
    else setPosts(data || [])
    setLoading(false)
  }

 function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
  const target = e.target as HTMLInputElement
  const { name, value, type } = target

  setFormData(prev => ({
    ...prev,
    [name]: type === 'checkbox' ? target.checked : value
  }))
}


  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData(prev => ({
      ...prev,
      imageFile: e.target.files?.[0] ?? null
    }))
  }

  function updateSlug(title: string) {
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '')
    setFormData(prev => ({ ...prev, slug }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    try {
      let url = formData.imageURL.trim()
      if (formData.imageFile) {
        const ext = formData.imageFile.name.split('.').pop()
        const name = `blog-${Date.now()}.${ext}`
        const path = `blog-images/${name}`

        const { error: upErr } = await supabase
          .storage
          .from('blog-images')
          .upload(path, formData.imageFile)
        if (upErr) throw upErr

        const { data: pub } = await supabase
          .storage
          .from('blog-images')
          .getPublicUrl(path)
        url = pub.publicUrl
      }

      const { data, error } = await supabase
        .from('blog_posts')
        .insert([{
          title: formData.title,
          excerpt: formData.excerpt,
          content: formData.content,
          slug: formData.slug,
          published: formData.published,
          image_url: url,
        }])
        .select()

      if (error) throw error

      resetForm()
      await fetchPosts()
    } catch (err: any) {
      alert('Error: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  function resetForm() {
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      slug: '',
      published: false,
      imageURL: '',
      imageFile: null
    })
    setShowForm(false)
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete?')) return
    setLoading(true)
    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id)
    if (error) alert('Delete failed: ' + error.message)
    else fetchPosts()
    setLoading(false)
  }

  if (loading && !showForm) return <LoadingSpinner />

  return (
    <div className="space-y-6 p-6">
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Blog Admin</h1>
        <button onClick={() => setShowForm(true)} className="bg-yellow-500 px-4 py-2 rounded">
          {showForm ? 'Cancel' : 'New Post'}
        </button>
      </header>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg space-y-4">
          <input name="title" value={formData.title} onChange={e => { handleChange(e); updateSlug(e.target.value); }}
            placeholder="Title" required className="w-full p-2 bg-gray-900 rounded" />

          <input name="slug" value={formData.slug} onChange={handleChange}
            placeholder="Slug (auto)" required className="w-full p-2 bg-gray-900 rounded" />

          <textarea name="excerpt" value={formData.excerpt} onChange={handleChange}
            placeholder="Excerpt" rows={2} className="w-full p-2 bg-gray-900 rounded" />

          <textarea name="content" value={formData.content} onChange={handleChange}
            placeholder="Content" rows={6} className="w-full p-2 bg-gray-900 rounded" />

          <input name="imageURL" value={formData.imageURL} onChange={handleChange}
            placeholder="Image URL (or choose file below)" className="w-full p-2 bg-gray-900 rounded" />

          <input type="file" accept="image/*" onChange={handleFile} className="text-white" />

          <label className="flex items-center">
            <input name="published" type="checkbox" checked={formData.published} onChange={handleChange} className="mr-2" />
            Publish immediately
          </label>

          <button type="submit" disabled={loading} className="bg-faded-gold px-4 py-2 rounded">
            {loading ? 'Saving...' : 'Save Post'}
          </button>
        </form>
      )}

      <table className="w-full bg-gray-800 text-white mt-4">
        <thead><tr><th>Title</th><th>Status</th><th>Created</th><th></th></tr></thead>
        <tbody>
          {posts.map(p => (
            <tr key={p.id} className="hover:bg-gray-700">
              <td className="p-2">{p.title}</td>
              <td className="p-2">{p.published ? 'Published' : 'Draft'}</td>
              <td className="p-2">{new Date(p.created_at).toLocaleDateString()}</td>
              <td className="p-2 space-x-2">
                <button onClick={() => router.push(`/admin/blog/edit/${p.id}`)}>Edit</button>
                <button className="text-red-400" onClick={() => handleDelete(p.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
