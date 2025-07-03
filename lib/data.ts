// lib/data.ts
import {supabase } from './supabase';

export async function getAllJournalPosts() {
  const { data, error } = await supabase
    .from('journal')
    .select('id, title, excerpt, full_text, image_url, date, read_time')
    .order('date', { ascending: false });

  if (error) {
    console.error('Supabase fetch error:', error.message);
    throw new Error('Failed to load journal posts');
  }

  return data;
}
