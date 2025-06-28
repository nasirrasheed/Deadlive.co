'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import LoadingSpinner from '@/components/admin/LoadingSpinner'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [formLoading, setFormLoading] = useState(false)
  const [error, setError] = useState('')
  
  const { user, loading: authLoading, signIn, signUp } = useAuth();
  const router = useRouter();

  // Redirect if already authenticated
  useEffect(() => {
    if (!authLoading && user) {
      router.push('/admin');
    }
  }, [user, authLoading, router]);

  // Show loading only while auth state is being checked
  if (authLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormLoading(true)
    setError('')

    try {
      const result = isSignUp 
        ? await signUp(email, password)
        : await signIn(email, password)

      if (result.error) {
        setError(result.error.message || 'Authentication failed')
      } else {
        router.push('/admin')
      }
    } catch (err) {
      setError('An unexpected error occurred')
      console.error(err)
    } finally {
      setFormLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="font-cinzel text-4xl font-bold text-faded-gold mb-2">
            DeadLive Admin
          </h1>
          <p className="text-gray-400">
            {isSignUp ? 'Create your admin account' : 'Sign in to your admin panel'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {error && (
            <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:border-faded-gold focus:outline-none transition-colors text-white"
                placeholder="admin@deadlive.co.uk"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:border-faded-gold focus:outline-none transition-colors text-white"
                placeholder="Enter your password"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={formLoading}
            className="w-full bg-faded-gold text-black py-3 rounded-lg font-semibold hover:bg-yellow-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {formLoading ? (
              <LoadingSpinner />
            ) : (
              isSignUp ? 'Create Account' : 'Sign In'
            )}
          </button>

          <div className="text-center">
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-faded-gold hover:text-yellow-400 transition-colors"
            >
              {isSignUp 
                ? 'Already have an account? Sign in' 
                : "Don't have an account? Sign up"
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}