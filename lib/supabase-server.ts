// supabase-server.ts
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import type { Database } from './supabase' // make sure path is correct

export const createServerSupabaseClient = () => {
  return createServerComponentClient<Database>({ cookies })
}
