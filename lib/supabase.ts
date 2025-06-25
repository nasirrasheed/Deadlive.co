import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      events: {
        Row: {
          id: string
          title: string
          description: string
          location: string
          date: string
          price: number
          category: string
          image_url: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          location: string
          date: string
          price: number
          category: string
          image_url: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          location?: string
          date?: string
          price?: number
          category?: string
          image_url?: string
          created_at?: string
          updated_at?: string
        }
      }
      services: {
        Row: {
          id: string
          title: string
          description: string
          price: number
          duration: string
          image_url: string
          features: string[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          price: number
          duration: string
          image_url: string
          features: string[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          price?: number
          duration?: string
          image_url?: string
          features?: string[]
          created_at?: string
          updated_at?: string
        }
      }
      blog_posts: {
        Row: {
          id: string
          title: string
          excerpt: string
          content: string
          image_url: string
          published: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          excerpt: string
          content: string
          image_url: string
          published?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          excerpt?: string
          content?: string
          image_url?: string
          published?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      reviews: {
        Row: {
          id: string
          name: string
          location: string
          quote: string
          image_url: string
          rating: number
          approved: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          location: string
          quote: string
          image_url: string
          rating: number
          approved?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          location?: string
          quote?: string
          image_url?: string
          rating?: number
          approved?: boolean
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}