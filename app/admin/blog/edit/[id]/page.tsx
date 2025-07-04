'use client'

import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import LoadingSpinner from '@/components/admin/LoadingSpinner'

export default function EditBlogPage() {
  const { id } = useParams()
  const router = useRouter()

  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [post, setPost] = useState<any>(null)

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image_url: '',
    imageFile: null as File | null
  })

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return

      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        console.error('Error fetching blog post:', error)
      } else {
        setPost(data)
        setFormData({
          title: data.title || '',
          content: data.content || '',
          image_url: data.image_url || '',
          imageFile: null
        })
      }

      setLoading(false)
    }

    fetchPost()
  }, [id])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setFormData(prev => ({ ...prev, imageFile: file }))
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setUpdating(true)

    let finalImageUrl = formData.image_url

    try {
      if (formData.imageFile) {
        const ext = formData.imageFile.name.split('.').pop()
        const fileName = `${Date.now()}.${ext}`
        const filePath = `blog/${fileName}`

        const { error: uploadError } = await supabase.storage
          .from('blog-images')
          .upload(filePath, formData.imageFile, {
            upsert: true
          })

        if (uploadError) throw uploadError

        const { data: publicUrlData } = supabase
          .storage
          .from('blog-images')
          .getPublicUrl(filePath)

        finalImageUrl = publicUrlData.publicUrl
      }

      const { error } = await supabase
        .from('blog_posts')
        .update({
          title: formData.title,
          content: formData.content,
          image_url: finalImageUrl
        })
        .eq('id', id)

      if (error) {
        console.error('Error updating post:', error)
        alert('Failed to update post')
      } else {
        alert('Post updated successfully!')
        router.push('/admin/blog/add')
      }
    } catch (error: any) {
      console.error('Update error:', error)
      alert('Failed to update post: ' + error.message)
    } finally {
      setUpdating(false)
    }
  }

  if (loading) return <div className="text-white p-8"><LoadingSpinner /> Loading post...</div>
  if (!post) return <div className="text-red-400 p-8">Blog post not found.</div>

  return (
    <div className="max-w-2xl mx-auto p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">Edit Blog Post</h1>
      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="block text-sm mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded text-white"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Image URL</label>
          <input
            type="text"
            name="image_url"
            value={formData.image_url}
            onChange={handleInputChange}
            placeholder="https://example.com/image.jpg"
            className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded text-white mb-2"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="text-white"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Content</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            rows={8}
            className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded text-white resize-none"
          />
        </div>

        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={updating}
            className="px-4 py-2 rounded bg-faded-gold text-black hover:bg-yellow-500"
          >
            {updating ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  )
}
