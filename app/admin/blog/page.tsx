'use client'

import { useState } from 'react'
import LoadingSpinner from '@/components/admin/LoadingSpinner'

interface BlogPost {
  id: string
  title: string
  excerpt: string
  published: boolean
  createdAt: string
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([
    {
      id: '1',
      title: 'The Haunting of Borley Rectory',
      excerpt: 'Discover the chilling tale of England\'s most haunted house and our recent investigation...',
      published: true,
      createdAt: '2024-02-28'
    },
    {
      id: '2',
      title: 'Voices from the Tower: Our London Investigation',
      excerpt: 'An exclusive look into our overnight investigation at the Tower of London...',
      published: true,
      createdAt: '2024-02-15'
    },
    {
      id: '3',
      title: 'Understanding EVP: Electronic Voice Phenomena',
      excerpt: 'Learn about the science behind EVP recordings and how our team uses cutting-edge technology...',
      published: false,
      createdAt: '2024-02-08'
    }
  ])
  const [loading, setLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this blog post?')) {
      setPosts(posts.filter(post => post.id !== id))
    }
  }

  const togglePublished = (id: string) => {
    setPosts(posts.map(post => 
      post.id === id ? { ...post, published: !post.published } : post
    ))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Blog Management</h1>
          <p className="text-gray-400">Manage your paranormal journal and blog posts</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-faded-gold text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition-colors"
        >
          Write New Post
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-900">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Post
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {posts.map((post) => (
                  <tr key={post.id} className="hover:bg-gray-700">
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-white">{post.title}</div>
                        <div className="text-sm text-gray-400 truncate max-w-md">{post.excerpt}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => togglePublished(post.id)}
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          post.published 
                            ? 'bg-green-900 text-green-200' 
                            : 'bg-yellow-900 text-yellow-200'
                        }`}
                      >
                        {post.published ? 'Published' : 'Draft'}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-300">{post.createdAt}</td>
                    <td className="px-6 py-4 text-sm font-medium space-x-2">
                      <button className="text-faded-gold hover:text-yellow-400">Edit</button>
                      <button 
                        onClick={() => handleDelete(post.id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-white mb-4">Write New Blog Post</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:border-faded-gold focus:outline-none text-white"
                  placeholder="Blog post title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Excerpt</label>
                <textarea
                  rows={2}
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:border-faded-gold focus:outline-none text-white resize-none"
                  placeholder="Brief description for the blog post"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Content</label>
                <textarea
                  rows={8}
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:border-faded-gold focus:outline-none text-white resize-none"
                  placeholder="Write your blog post content here..."
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="published"
                  className="mr-2"
                />
                <label htmlFor="published" className="text-sm text-gray-300">
                  Publish immediately
                </label>
              </div>
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 bg-gray-700 text-white py-2 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-faded-gold text-black py-2 rounded-lg hover:bg-yellow-500 transition-colors"
                >
                  Create Post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}