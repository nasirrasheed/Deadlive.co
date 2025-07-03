import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import type { Database } from './supabase'; // adjust this if your Database type lives elsewhere

export const createServerSupabaseClient = () => {
  return createServerComponentClient<Database>({ cookies });
};

