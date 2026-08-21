import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Part = {
  id: string;
  name: string;
  brand: string;
  category: string;
  compatibility: string;
  description: string;
  price: number;
  compare_at_price: number | null;
  rating: number;
  review_count: number;
  stock_status: string;
  image_url: string;
  badge: string | null;
  is_featured: boolean;
  created_at: string;
};
