
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface UserProfile {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Watchlist {
  id: string;
  user_id: string;
  movie_id: number;
  movie_title: string;
  movie_poster_path?: string;
  movie_overview?: string;
  movie_release_date?: string;
  movie_vote_average?: number;
  added_at: string;
}

export interface UserReview {
  id: string;
  user_id: string;
  movie_id: number;
  movie_title: string;
  rating: number;
  review_text?: string;
  created_at: string;
  updated_at: string;
}
